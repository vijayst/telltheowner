import { prisma } from "@/lib/prisma";

export function subscriptionGrantsAccess(status: string): boolean {
  return status === "active" || status === "trialing";
}

export async function businessHasPaidAccess(clientId: string): Promise<boolean> {
  const subscription = await prisma.subscription.findFirst({
    where: {
      clientId,
      status: { in: ["active", "trialing"] },
    },
    select: { subscriptionId: true },
  });

  return subscription !== null;
}
