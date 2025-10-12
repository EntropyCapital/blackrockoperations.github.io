import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Only guard /admin
export const config = { matcher: ["/admin/:path*"] };

export default function middleware(req: NextRequest) {
  try {
    // In middleware, cookies API is Edge – values are strings directly (no .value in older Next versions)
    const access = req.cookies.get("sb-access-token");
    const refresh = req.cookies.get("sb-refresh-token");

    const isAuthed = Boolean(
      (typeof access === "string" ? access : access?.value) ||
      (typeof refresh === "string" ? refresh : refresh?.value)
    );

    if (!isAuthed) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("redirectedFrom", req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    // Never crash the request — fall through so you can see the page and check logs
    console.error("middleware error", err);
    return NextResponse.next();
  }
}
