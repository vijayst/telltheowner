import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await auth();
    console.log("Onboarding API - Session:", JSON.stringify(session, null, 2));

    if (!session || !session.user || !session.user.id) {
      console.error("Session check failed - no session or user");
      return NextResponse.json(
        { error: "You must be logged in to complete onboarding" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const body = await request.json();
    const { clientId, businessName, businessAddress, isOnlineBusiness } = body;

    // Validate input
    if (!clientId || !businessName) {
      return NextResponse.json(
        { error: "Client ID and business name are required" },
        { status: 400 }
      );
    }
    
    // Business address is required for physical businesses, optional for online businesses
    if (!isOnlineBusiness && !businessAddress) {
      return NextResponse.json(
        { error: "Business address is required for physical businesses" },
        { status: 400 }
      );
    }

    // Check if client ID is unique
    const existingBusiness = await prisma.business.findUnique({
      where: { clientId },
    });

    if (existingBusiness) {
      return NextResponse.json(
        { error: "Client ID already exists. Please choose a different one." },
        { status: 409 }
      );
    }

    // Check if user already has a business with this clientId
    const existingBusinessUser = await prisma.businessUser.findFirst({
      where: {
        userId: userId,
        business: {
          clientId: clientId,
        },
      },
    });

    if (existingBusinessUser) {
      return NextResponse.json(
        { error: "You have already created a business with this client ID" },
        { status: 400 }
      );
    }

    // Create business and businessUser records in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create business record
      const business = await tx.business.create({
        data: {
          clientId,
          businessName,
          businessAddress: isOnlineBusiness ? "" : businessAddress,
          isOnlineBusiness: isOnlineBusiness || false,
        },
      });

      // Create businessUser record linking the user to the business
      const businessUser = await tx.businessUser.create({
        data: {
          userId: userId,
          businessId: business.clientId,
          role: "owner",
        },
      });

      return { business, businessUser };
    });

    return NextResponse.json({
      success: true,
      business: result.business,
    });
  } catch (error) {
    console.error("Error during onboarding:", error);
    return NextResponse.json(
      { error: "Failed to save business information" },
      { status: 500 }
    );
  }
}