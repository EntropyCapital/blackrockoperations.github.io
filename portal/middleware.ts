import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Protect ONLY the admin area.
// Do NOT import Supabase here (Edge runtime).
export const config = {
  matcher: ["/admin/:path*"],
};

export default function middleware(req: NextRequest) {
  try {
    // Supabase auth cookies set by @supabase/ssr
    const access = req.cookies.get("sb-access-token")?.value;
    const refresh = req.cookies.get("sb-refresh-token")?.value;

    // If not logged in, send to login and preserve where they came from
    if (!access && !refresh) {
      const url = new URL("/auth/login", req.url);
      url.searchParams.set("redirectedFrom", req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(url);
    }

    // Auth cookie(s) present -> proceed
    return NextResponse.next();
  } catch {
    // Never throw from middleware; just let the request continue
    return NextResponse.next();
  }
}
