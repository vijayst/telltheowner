import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");

    if (!clientId) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    // Check if client ID already exists
    const existingBusiness = await prisma.business.findUnique({
      where: { clientId },
    });

    return NextResponse.json({
      available: !existingBusiness,
    });
  } catch (error) {
    console.error("Error checking client ID:", error);
    return NextResponse.json(
      { error: "Failed to check client ID availability" },
      { status: 500 }
    );
  }
}