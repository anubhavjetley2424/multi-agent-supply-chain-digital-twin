import { login } from './actions'

// Standard Next.js 15 pattern: make the component async to await params
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }> // Defined as a Promise
}) {
  // Resolve the searchParams before accessing properties
  const resolvedParams = await searchParams;

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h1>Login</h1>
      
      {resolvedParams.error && (
        <p style={{ color: 'red', background: '#fee', padding: '10px', borderRadius: '4px' }}>
          {resolvedParams.error}
        </p>
      )}

      <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required style={inputStyle} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required style={inputStyle} />
        </div>

        <button type="submit" style={buttonStyle}>
          Sign In
        </button>
      </form>

      <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  )
}

const inputStyle = { width: '100%', padding: '8px', marginTop: '4px' }
const buttonStyle = { padding: '10px', background: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }