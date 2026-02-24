'use client' // This tells Next.js this is an interactive component

export default function SignOutButton() {
  return (
    <form action="/api/auth/signout" method="post">
      <button 
        type="submit" 
        style={{ 
          padding: '8px 16px', 
          background: '#ff4444', 
          color: 'white', 
          border: 'none', 
          borderRadius: '6px',
          fontWeight: '600',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = '#cc0000')}
        onMouseOut={(e) => (e.currentTarget.style.background = '#ff4444')}
      >
        Sign Out
      </button>
    </form>
  )
}