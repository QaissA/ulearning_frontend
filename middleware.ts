import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard)
  const path = request.nextUrl.pathname;
  console.log("Middleware - Current path:", path);

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/auth/signin" ||
    path === "/auth/signup" ||
    path === "/home" ||
    path === "/" ||
    path.startsWith("/api/");

  console.log("Middleware - Is public path:", isPublicPath);

  // Get the token from the cookies
  const authCookie = request.cookies.get("auth-storage");
  console.log("Middleware - Auth cookie:", authCookie?.value);

  let isAuthenticated = false;

  try {
    if (authCookie?.value) {
      const parsedCookie = JSON.parse(authCookie.value);
      console.log("Middleware - Parsed cookie state:", parsedCookie?.state);
      // Check if the token exists and isAuthenticated is true
      isAuthenticated = Boolean(
        parsedCookie?.state?.token && parsedCookie?.state?.isAuthenticated
      );
      console.log("Middleware - Authentication status:", isAuthenticated);
    }
  } catch (error) {
    console.error("Middleware - Error parsing auth cookie:", error);
    isAuthenticated = false;
  }

  // Handle dashboard access
  if (path.startsWith("/dashboard")) {
    console.log("Middleware - Attempting to access dashboard");
    if (!isAuthenticated) {
      console.log("Middleware - Not authenticated, redirecting to signin");
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
    console.log("Middleware - Authenticated, allowing dashboard access");
    return NextResponse.next();
  }

  // Handle auth pages access (signin/signup)
  if ((path === "/auth/signin" || path === "/auth/signup") && isAuthenticated) {
    console.log(
      "Middleware - Authenticated user trying to access auth pages, redirecting to dashboard"
    );
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
