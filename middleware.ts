import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard)
  const path = request.nextUrl.pathname;
  console.log("Middleware - Current path:", path);

  // Define public paths that don't require authentication
  const publicPaths = ["/auth/signin", "/auth/signup", "/home", "/"];
  const isPublicPath =
    publicPaths.some((publicPath) => path === publicPath) ||
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

  // Handle authentication routes (prevent authenticated users from accessing login/signup)
  if (path === "/auth/signin" || path === "/auth/signup") {
    if (isAuthenticated) {
      console.log(
        "Middleware - Authenticated user trying to access auth pages"
      );
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Handle root path
  if (path === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // For all other routes, just check if user is authenticated
  if (!isPublicPath && !isAuthenticated) {
    console.log("Middleware - Not authenticated, redirecting to signin");
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Allow all other navigation for authenticated users
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
