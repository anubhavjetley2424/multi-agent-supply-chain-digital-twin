import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import SignOutButton from '@/components/auth/sign-out-button' // Move your logic to a component

export default async function SupplyChainDashboard() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect('/login')

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', padding: '20px' }}>
      {/* Main Logistics Segment */}
      <section>
        <header style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Supply Chain Operations</h1>
          <SignOutButton />
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          {/* Shipment Tracker Segment */}
          <div style={cardStyle}>
             <h3>Shipment Tracking</h3>
             <p>Map and Table data would load here.</p>
          </div>

          {/* Efficiency Analytics Segment */}
          <div style={cardStyle}>
             <h3>Efficiency Metrics</h3>
             <p>Charts and KPIs would load here.</p>
          </div>
        </div>
      </section>

      {/* RAG Chatbot Segment (Side Panel) */}
      <aside style={{ borderLeft: '1px solid #ddd', padding: '0 20px' }}>
        <h3>AI Logistics Assistant</h3>
        <div style={{ height: '500px', background: '#f9f9f9', borderRadius: '8px', padding: '10px' }}>
          {/* We would inject the Chatbot component here */}
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Ask me about inventory or delays...</p>
        </div>
      </aside>
    </div>
  )
}

const cardStyle = { border: '1px solid #eee', padding: '20px', borderRadius: '12px', background: '#fff' }