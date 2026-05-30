import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const businessUser = await prisma.businessUser.findFirst({
      where: { userId: session.user.id },
      include: { business: true },
    });

    if (!businessUser?.business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    return NextResponse.json({
      clientId: businessUser.business.clientId,
      businessName: businessUser.business.businessName,
      businessAddress: businessUser.business.businessAddress,
    });
  } catch (error) {
    console.error("Error fetching business data:", error);
    return NextResponse.json({ error: "Failed to fetch business data" }, { status: 500 });
  }
}