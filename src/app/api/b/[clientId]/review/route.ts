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

    // Parse form data with audio file
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "Audio file is required" },
        { status: 400 }
      );
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

    // Save review to database
    const review = await prisma.review.create({
      data: {
        clientId,
        text: transcription.text.trim(),
        visibility: false,
      },
    });

    return NextResponse.json({
      success: true,
      review: {
        id: review.id,
        text: review.text,
        createdAt: review.createdAt,
      },
    });
  } catch (error) {
    console.error("Error processing review:", error);
    return NextResponse.json(
      { error: "Failed to process review" },
      { status: 500 }
    );
  }
}