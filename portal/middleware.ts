import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(_req: NextRequest) {
  return NextResponse.next();
}

// Only run on app routes, not on assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
