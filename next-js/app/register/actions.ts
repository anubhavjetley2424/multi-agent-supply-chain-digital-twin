'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function register(formData: FormData) {
  const supabase = await createClient()

  // Extract data from the form fields
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  // 1. Call Supabase Auth to create the user
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    // In a pro app, you'd handle specific error messages
    return redirect(`/register?error=${encodeURIComponent(error.message)}`)
  }

  // 2. On success, redirect to a "Verify Email" or Dashboard page
  redirect('/dashboard')
}