import { createClient } from "@supabase/supabase-js"

/**
 * Only import this file in Server Components / Route Handlers!
 * The service-role key bypasses Row-Level Security.
 */
export const supabaseServer = () =>
  createClient(
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // SERVICE_ROLE key lives only on the server – NEVER expose it to the client.
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  )
