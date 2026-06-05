import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  try {
    const { clientId } = await params;

    // Validate clientId
    if (!clientId) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    // Check if business exists
    const business = await prisma.business.findUnique({
      where: { clientId },
    });

    if (!business) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    // Check if user has already submitted a review using HttpOnly cookie
    const cookieName = `review_submitted_${clientId}`;
    const existingCookie = request.cookies.get(cookieName);

    if (existingCookie) {
      return NextResponse.json(
        {
          error: "You have already submitted a review. Please try again tomorrow."
        },
        { status: 429 }
      );
    }

    // Parse form data with audio file
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;
    const fingerprint = formData.get("fingerprint") as string | null;

    if (!audioFile) {
      return NextResponse.json(
        { error: "Audio file is required" },
        { status: 400 }
      );
    }

    if (!fingerprint) {
      return NextResponse.json(
        { error: "Fingerprint is required" },
        { status: 400 }
      );
    }

    // Check if this customer has submitted a review in the last 24 hours
    const existingFingerprint = await prisma.customerFingerprint.findUnique({
      where: {
        clientId_fingerprint: {
          clientId,
          fingerprint,
        },
      },
    });

    if (existingFingerprint?.lastSubmittedAt) {
      const lastSubmission = new Date(existingFingerprint.lastSubmittedAt);
      const hoursSinceLastSubmission = (Date.now() - lastSubmission.getTime()) / (1000 * 60 * 60);

      if (hoursSinceLastSubmission < 24) {
        const hoursRemaining = Math.ceil(24 - hoursSinceLastSubmission);
        return NextResponse.json(
          {
            error: `You have already submitted a review recently. Please wait ${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''} before submitting another review.`,
          },
          { status: 429 } // Too Many Requests
        );
      }
    }

    // Convert File to Buffer
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a File object for Groq SDK
    const file = new File([buffer], audioFile.name, {
      type: audioFile.type,
    });

    // Transcribe audio using Groq
    let transcription;
    try {
      transcription = await groq.audio.transcriptions.create({
        file: file,
        model: "whisper-large-v3",
        temperature: 0,
        response_format: "verbose_json",
      });
    } catch (transcriptionError) {
      console.error("Transcription error:", transcriptionError);
      return NextResponse.json(
        { error: "Failed to transcribe audio. Please try again." },
        { status: 500 }
      );
    }

    if (!transcription || !transcription.text || transcription.text.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not transcribe audio or audio was empty" },
        { status: 400 }
      );
    }

    // Save review to database with customer fingerprint
    const review = await prisma.review.create({
      data: {
        clientId,
        text: transcription.text.trim(),
        visibility: false,
        customerFingerprint: fingerprint,
      },
    });

    // Update or create fingerprint record with submission tracking
    if (existingFingerprint) {
      await prisma.customerFingerprint.update({
        where: { id: existingFingerprint.id },
        data: {
          lastSubmittedAt: new Date(),
          reviewCount: { increment: 1 },
        },
      });
    } else {
      await prisma.customerFingerprint.create({
        data: {
          clientId,
          fingerprint,
          lastSubmittedAt: new Date(),
          reviewCount: 1,
        },
      });
    }

    // Create response and set HttpOnly cookie
    const response = NextResponse.json({
      success: true,
      review: {
        id: review.id,
        text: review.text,
        createdAt: review.createdAt,
      },
    });

    // Set HttpOnly cookie with 1-day expiration
    response.cookies.set({
      name: cookieName,
      value: 'true',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: `/api/b/${clientId}/review`,
    });

    return response;
  } catch (error) {
    console.error("Error processing review:", error);
    return NextResponse.json(
      { error: "Failed to process review" },
      { status: 500 }
    );
  }
}