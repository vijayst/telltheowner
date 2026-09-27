import { prisma } from "@/lib/prisma";
import { getPaddle } from "@/lib/paddle/server";

export async function createBillingPortalUrl(userId: string): Promise<string> {
  const businessUser = await prisma.businessUser.findFirst({
    where: { userId },
    include: {
      business: {
        include: {
          subscriptions: {
            select: { subscriptionId: true },
          },
        },
      },
    },
  });

  const business = businessUser?.business;
  const paddleCustomerId = business?.paddleCustomerId;

  if (!business || !paddleCustomerId) {
    throw new Error("No Paddle customer is linked to this account.");
  }

  const session = await getPaddle().customerPortalSessions.create(
    paddleCustomerId,
    business.subscriptions.map((subscription) => subscription.subscriptionId)
  );

  return session.urls.general.overview;
}
