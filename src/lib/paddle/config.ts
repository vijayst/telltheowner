import type { Environments } from "@paddle/paddle-js";

export function getPaddleEnvironment(): Environments {
  const environment = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT;

  if (environment !== "sandbox" && environment !== "production") {
    throw new Error(
      'NEXT_PUBLIC_PADDLE_ENVIRONMENT must be set to "sandbox" or "production".'
    );
  }

  return environment;
}

export function getPaddleClientToken(): string {
  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

  if (!token) {
    throw new Error("NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is not set.");
  }

  if (getPaddleEnvironment() === "sandbox" && !token.startsWith("test_")) {
    throw new Error(
      'NEXT_PUBLIC_PADDLE_CLIENT_TOKEN must be a sandbox token starting with "test_" when NEXT_PUBLIC_PADDLE_ENVIRONMENT is sandbox.'
    );
  }

  return token;
}
