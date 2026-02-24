import { register } from './actions'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }> // SearchParams is now a Promise
}) {
  // Await the searchParams to extract the error if it exists
  const resolvedParams = await searchParams;

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h1>Create Account</h1>
      
      {resolvedParams.error && (
        <p style={{ color: 'red', background: '#fee', padding: '10px', borderRadius: '4px' }}>
          {resolvedParams.error}
        </p>
      )}

      <form action={register} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" type="text" required style={inputStyle} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required style={inputStyle} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required style={inputStyle} />
        </div>

        <button type="submit" style={buttonStyle}>
          Register
        </button>
      </form>
      
      <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  )
}

const inputStyle = { width: '100%', padding: '8px', marginTop: '4px' }
const buttonStyle = { padding: '10px', background: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }