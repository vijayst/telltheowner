import { Environment, Paddle } from "@paddle/paddle-node-sdk";
import { getPaddleEnvironment } from "@/lib/paddle/config";

export function getPaddleApiKey(): string {
  const apiKey = process.env.PADDLE_API_KEY;

  if (!apiKey) {
    throw new Error("PADDLE_API_KEY is not set.");
  }

  return apiKey;
}

export function getPaddleWebhookSecret(): string {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;

  if (!secret) {
    throw new Error("PADDLE_WEBHOOK_SECRET is not set.");
  }

  return secret;
}

let paddle: Paddle | undefined;

export function getPaddle(): Paddle {
  if (!paddle) {
    const environment = getPaddleEnvironment();
    paddle = new Paddle(getPaddleApiKey(), {
      environment:
        environment === "sandbox" ? Environment.sandbox : Environment.production,
    });
  }

  return paddle;
}
