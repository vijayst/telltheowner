import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const demoClientId = searchParams.get("clientId");

  // Allow public access for demo reviews
  if (demoClientId && demoClientId === "demo") {
    try {
      // Get pagination parameters
      const page = parseInt(searchParams.get("page") || "1");
      const pageSize = parseInt(searchParams.get("pageSize") || "20");

      const skip = (page - 1) * pageSize;

      // Get total count
      const total = await prisma.review.count({
        where: { clientId: demoClientId },
      });

      // Get paginated reviews, sorted by createdAt descending
      const reviews = await prisma.review.findMany({
        where: { clientId: demoClientId },
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
        select: {
          id: true,
          text: true,
          customerFingerprint: true,
          createdAt: true,
        },
      });

      const totalPages = Math.ceil(total / pageSize);

      return NextResponse.json({
        reviews,
        total,
        page,
        pageSize,
        totalPages,
      });
    } catch (error) {
      console.error("Error fetching demo reviews:", error);
      return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
  }

  // Authenticated access for regular reviews
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get the user's business
    const businessUser = await prisma.businessUser.findFirst({
      where: { userId: session.user.id },
      include: { business: true },
    });

    if (!businessUser?.business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const clientId = businessUser.business.clientId;

    // Get pagination parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");

    const skip = (page - 1) * pageSize;

    // Get total count
    const total = await prisma.review.count({
      where: { clientId },
    });

    // Get paginated reviews, sorted by createdAt descending
    const reviews = await prisma.review.findMany({
      where: { clientId },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      select: {
        id: true,
        text: true,
        customerFingerprint: true,
        createdAt: true,
      },
    });

    const totalPages = Math.ceil(total / pageSize);

    return NextResponse.json({
      reviews,
      total,
      page,
      pageSize,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}