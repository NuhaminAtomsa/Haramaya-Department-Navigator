import { useState } from 'react'
import { supabase } from '../supabaseClient'
import './Login.css'

function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + '/dashboard',
            data: {
              full_name: fullName,
            }
          }
        })
        
        if (error) {
          if (error.message.includes('already registered')) {
            setMessage('Account already exists. Please sign in.')
          } else {
            throw error
          }
          setLoading(false)
          return
        }
        
        // Auto-confirm and sign in (works when email confirmation is disabled)
        if (data.user) {
          setMessage('Account created successfully!')
          // User is automatically signed in, redirect happens via App.jsx
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) {
          if (error.message.includes('Invalid')) {
            setMessage('Invalid email or password')
          } else {
            throw error
          }
          setLoading(false)
          return
        }
      }
    } catch (error) {
      setMessage(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/logo.svg" alt="HN" className="login-logo" />
          <h1>Haramaya Navigator</h1>
          <p>Find your perfect department 🎓</p>
        </div>

        <form onSubmit={handleAuth} className="login-form">
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={isSignUp}
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {message && (
            <div className={`message ${message.includes('Invalid') || message.includes('error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="toggle-auth">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignUp(!isSignUp)} className="toggle-btn">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
