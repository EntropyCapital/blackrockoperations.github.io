import { cookies, headers } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import type { CookieOptions } from "@supabase/ssr";

// helper used by server components / route handlers
export function createClient() {
  const cookieStore = cookies(); // ✅ no await

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
      global: {
        headers: {
          "x-forwarded-host": headers().get("x-forwarded-host") || "",
          "x-forwarded-proto": headers().get("x-forwarded-proto") || "",
        },
      },
    }
  );
}
