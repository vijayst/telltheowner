import { EventName, type EventEntity } from "@paddle/paddle-node-sdk";
import { prisma } from "@/lib/prisma";

type CustomData = { clientId?: unknown } | null;

type SubscriptionEventData = {
  id: string;
  status: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
  scheduledChange: { action: string; effectiveAt: string } | null;
  items: Array<{ price: { id: string; productId: string } | null }>;
  customData: CustomData;
};

type CustomerEventData = {
  id: string;
  email: string;
  customData: CustomData;
};

type TransactionEventData = {
  id: string;
  customerId: string | null;
  customData: CustomData;
};

function clientIdFromCustomData(customData: CustomData): string | undefined {
  const clientId = customData?.clientId;
  return typeof clientId === "string" && clientId.length > 0 ? clientId : undefined;
}

async function resolveClientId({
  paddleCustomerId,
  customData,
  email,
}: {
  paddleCustomerId?: string | null;
  customData: CustomData;
  email?: string | null;
}): Promise<string | undefined> {
  const customClientId = clientIdFromCustomData(customData);

  if (customClientId) {
    const business = await prisma.business.findUnique({
      where: { clientId: customClientId },
      select: { clientId: true },
    });

    if (business) {
      return business.clientId;
    }
  }

  if (paddleCustomerId) {
    const business = await prisma.business.findUnique({
      where: { paddleCustomerId },
      select: { clientId: true },
    });

    if (business) {
      return business.clientId;
    }
  }

  if (email) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        businessUsers: {
          where: { role: "owner" },
          take: 1,
          select: { businessId: true },
        },
      },
    });

    return user?.businessUsers[0]?.businessId;
  }

  return undefined;
}

async function linkPaddleCustomer(clientId: string, paddleCustomerId: string) {
  const business = await prisma.business.findUnique({
    where: { clientId },
    select: { paddleCustomerId: true },
  });

  if (!business) {
    throw new Error(`Business ${clientId} was not found.`);
  }

  if (business.paddleCustomerId === paddleCustomerId) {
    return;
  }

  if (business.paddleCustomerId) {
    throw new Error(
      `Business ${clientId} is already linked to Paddle customer ${business.paddleCustomerId}.`
    );
  }

  const existingLink = await prisma.business.findUnique({
    where: { paddleCustomerId },
    select: { clientId: true },
  });

  if (existingLink && existingLink.clientId !== clientId) {
    throw new Error(
      `Paddle customer ${paddleCustomerId} is already linked to business ${existingLink.clientId}.`
    );
  }

  await prisma.business.update({
    where: { clientId },
    data: { paddleCustomerId },
  });
}

async function upsertSubscription(subscription: SubscriptionEventData) {
  const price = subscription.items.find((item) => item.price)?.price;

  if (!price) {
    throw new Error(`Subscription ${subscription.id} is missing a price.`);
  }

  const clientId = await resolveClientId({
    paddleCustomerId: subscription.customerId,
    customData: subscription.customData,
  });

  if (!clientId) {
    throw new Error(
      `Subscription ${subscription.id} could not be matched to a business.`
    );
  }

  await linkPaddleCustomer(clientId, subscription.customerId);

  const incomingUpdatedAt = new Date(subscription.updatedAt);

  await prisma.$transaction(async (tx) => {
    const existing = await tx.subscription.findUnique({
      where: { subscriptionId: subscription.id },
      select: { updatedAt: true },
    });

    if (existing && existing.updatedAt > incomingUpdatedAt) {
      return;
    }

    const data = {
      clientId,
      status: subscription.status,
      priceId: price.id,
      productId: price.productId,
      scheduledChangeAction: subscription.scheduledChange?.action ?? null,
      scheduledChangeAt: subscription.scheduledChange
        ? new Date(subscription.scheduledChange.effectiveAt)
        : null,
      updatedAt: incomingUpdatedAt,
    };

    await tx.subscription.upsert({
      where: { subscriptionId: subscription.id },
      create: {
        subscriptionId: subscription.id,
        createdAt: new Date(subscription.createdAt),
        ...data,
      },
      update: data,
    });
  });
}

async function handleCustomer(customer: CustomerEventData) {
  const clientId = await resolveClientId({
    paddleCustomerId: customer.id,
    customData: customer.customData,
    email: customer.email,
  });

  if (!clientId) {
    console.error(
      `Paddle customer ${customer.id} could not be matched to a business.`
    );
    return;
  }

  await linkPaddleCustomer(clientId, customer.id);
}

async function handleTransactionCompleted(transaction: TransactionEventData) {
  if (!transaction.customerId) {
    return;
  }

  const clientId = await resolveClientId({
    paddleCustomerId: transaction.customerId,
    customData: transaction.customData,
  });

  if (!clientId) {
    console.error(
      `Transaction ${transaction.id} could not be matched to a business.`
    );
    return;
  }

  await linkPaddleCustomer(clientId, transaction.customerId);
}

export async function routePaddleEvent(event: EventEntity) {
  switch (event.eventType) {
    case EventName.SubscriptionCreated:
    case EventName.SubscriptionUpdated:
    case EventName.SubscriptionCanceled:
      await upsertSubscription(event.data);
      return;
    case EventName.CustomerCreated:
    case EventName.CustomerUpdated:
      await handleCustomer(event.data);
      return;
    case EventName.TransactionCompleted:
      await handleTransactionCompleted(event.data);
      return;
    default:
      return;
  }
}
