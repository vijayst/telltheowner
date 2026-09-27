import { NextResponse } from "next/server";
import { routePaddleEvent } from "@/lib/paddle/events";
import { getPaddle, getPaddleWebhookSecret } from "@/lib/paddle/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const signature = request.headers.get("paddle-signature");
  const rawBody = await request.text();

  if (!signature || !rawBody) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let paddle;
  let secret;

  try {
    paddle = getPaddle();
    secret = getPaddleWebhookSecret();
  } catch (error) {
    console.error("Paddle webhook is not configured:", error);
    return NextResponse.json({ error: "Webhook is not configured" }, { status: 500 });
  }

  let event;

  try {
    event = await paddle.webhooks.unmarshal(rawBody, secret, signature);
  } catch (error) {
    console.error("Paddle webhook verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    await routePaddleEvent(event);
  } catch (error) {
    console.error("Paddle webhook handler failed:", error);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
