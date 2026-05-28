import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await auth();
    console.log("Onboarding API - Session:", JSON.stringify(session, null, 2));

    if (!session || !session.user) {
      console.error("Session check failed - no session or user");
      return NextResponse.json(
        { error: "You must be logged in to complete onboarding" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { clientId, businessName, businessAddress } = body;

    // Validate input
    if (!clientId || !businessName || !businessAddress) {
      return NextResponse.json(
        { error: "All fields are required" },
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

    // Check if user already has a business
    const userBusiness = await prisma.business.findFirst({
      where: {
        clientId: clientId,
      },
    });

    if (userBusiness) {
      return NextResponse.json(
        { error: "You have already completed onboarding" },
        { status: 400 }
      );
    }

    // Create business record
    const business = await prisma.business.create({
      data: {
        clientId,
        businessName,
        businessAddress,
      },
    });

    return NextResponse.json({
      success: true,
      business,
    });
  } catch (error) {
    console.error("Error during onboarding:", error);
    return NextResponse.json(
      { error: "Failed to save business information" },
      { status: 500 }
    );
  }
}