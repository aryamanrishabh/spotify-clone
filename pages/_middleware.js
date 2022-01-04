import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  // token will exist if user logged in
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie:
      process.env.NEXTAUTH_URL?.startsWith("https://") ??
      !!process.env.VERCEL_URL,
  });

  const { pathname } = req.nextUrl;

  // if token exists and path to login
  if (token && pathname.includes("/login")) {
    return NextResponse.redirect("/");
  }

  // allow the req if following is true
  // 1. its a request for a next-auth session & provider fetching
  // 2. token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // redirect to login page if no token and requesting a protected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
};
