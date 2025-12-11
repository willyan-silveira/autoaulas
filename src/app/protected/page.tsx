import { redirect } from 'next/navigation'
import { LogoutButton } from '@/components/logout-button'
import { supabase } from '@/lib/supabase/server'

export default async function ProtectedPage() {
  // Aqui não chamamos como função, pois supabase já é o client pronto
  const { data, error } = await supabase.auth.getClaims()

  if (error || !data?.claims) {
    redirect('/')
  }

  return (
    <div className="flex h-svh w-full items-center justify-center gap-2">
      <p>
        Hello <span>{data.claims.email}</span>
      </p>
      <LogoutButton />
    </div>
  )
}
