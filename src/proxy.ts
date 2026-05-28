import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isOnLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isOnOnboarding = req.nextUrl.pathname.startsWith("/onboarding");
  const isOnPublicPage = req.nextUrl.pathname === "/" ||
                        req.nextUrl.pathname.startsWith("/about") ||
                        req.nextUrl.pathname.startsWith("/privacy") ||
                        req.nextUrl.pathname.startsWith("/terms");

  // Redirect authenticated users away from login pages (except the sent page)
  if ((isOnAuthPage || isOnLoginPage) && isLoggedIn && req.nextUrl.pathname !== "/login/sent") {
    // Check if user has completed onboarding
    try {
      const business = await prisma.business.findFirst();
      if (business) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Allow access to public pages (including home page) for everyone
  if (isOnPublicPage) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated and trying to access protected routes
  if (!isLoggedIn && (isOnDashboard || isOnOnboarding)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect authenticated users away from login pages (except the sent page)
  if ((isOnAuthPage || isOnLoginPage) && isLoggedIn && req.nextUrl.pathname !== "/login/sent") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Check if user has completed onboarding for dashboard access
  if (isLoggedIn && isOnDashboard) {
    try {
      const business = await prisma.business.findFirst();
      if (!business) {
        // User hasn't completed onboarding, redirect to onboarding page
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      // If we can't check, let the user proceed (fail open)
    }
  }

  // Prevent access to onboarding if already completed
  if (isLoggedIn && isOnOnboarding) {
    try {
      const business = await prisma.business.findFirst();
      if (business) {
        // User has completed onboarding, redirect to dashboard
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      // If we can't check, let the user proceed to onboarding
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};