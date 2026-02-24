'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Supabase verifies the email and hashed password automatically
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Redirect back to login with a specific error message
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  // On success, send the user to the protected dashboard
  redirect('/dashboard')
}