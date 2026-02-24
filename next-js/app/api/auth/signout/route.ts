import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  // This clears the session and the cookies
  await supabase.auth.signOut()

  // Redirect the user back to the home page after logging out
  return NextResponse.redirect(new URL('/login', request.url), {
    status: 302,
  })
}