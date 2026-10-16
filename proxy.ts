import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow authentication routes without protection
  if (pathname === "/signin" || pathname === "/signup" || pathname === "/") {
    return NextResponse.next();
  }

  // Temporary placeholder until authentication is implemented
  console.log("Protected route:", pathname);

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};

