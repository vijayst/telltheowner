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

export async function PUT(request: Request) {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { businessName, businessAddress, clientId } = body;

    // Get the current business
    const businessUser = await prisma.businessUser.findFirst({
      where: { userId: session.user.id },
      include: { business: true },
    });

    if (!businessUser?.business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const currentClientId = businessUser.business.clientId;

    // If clientId is being changed, validate it
    if (clientId && clientId !== currentClientId) {
      // Check if client ID format is valid
      const clientIdRegex = /^[a-zA-Z0-9-_]+$/;
      if (!clientIdRegex.test(clientId)) {
        return NextResponse.json(
          { error: "Client ID can only contain letters, numbers, hyphens, and underscores" },
          { status: 400 }
        );
      }

      // Check if new client ID already exists
      const existingBusiness = await prisma.business.findUnique({
        where: { clientId },
      });

      if (existingBusiness) {
        return NextResponse.json(
          { error: "This URL is already taken by another business" },
          { status: 400 }
        );
      }

      // Check if there are reviews on the current client ID
      const reviewCount = await prisma.review.count({
        where: { clientId: currentClientId },
      });

      if (reviewCount > 0) {
        return NextResponse.json(
          { error: "Cannot change URL: you have existing reviews. Please contact support if you need to change your URL." },
          { status: 400 }
        );
      }
    }

    // Update the business
    const updatedBusiness = await prisma.business.update({
      where: { clientId: currentClientId },
      data: {
        businessName: businessName || businessUser.business.businessName,
        businessAddress: businessAddress || businessUser.business.businessAddress,
        clientId: clientId || currentClientId,
      },
    });

    return NextResponse.json({
      clientId: updatedBusiness.clientId,
      businessName: updatedBusiness.businessName,
      businessAddress: updatedBusiness.businessAddress,
    });
  } catch (error) {
    console.error("Error updating business data:", error);
    return NextResponse.json({ error: "Failed to update business data" }, { status: 500 });
  }
}