// portal/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  // Start with a pass-through response we can attach cookies to
  const res = NextResponse.next();

  // Create an Edge-safe Supabase client bound to request/response cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          // make sure we persist any auth cookie changes
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          res.cookies.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );

  // v2 API – this exists on supabase-js v2
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = req.nextUrl;

  // Protect admin area
  if (pathname.startsWith("/admin") && !user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Protect client area
  if (pathname.startsWith("/client") && !user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return res;
}

// Exclude static assets and (optionally) the login page from middleware
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
  // If you want to avoid protecting /login add it to the negative lookahead:
  // matcher: ["/((?!_next/static|_next/image|favicon.ico|login).*)"],
};
