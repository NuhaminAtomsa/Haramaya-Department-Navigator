import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar({ session }) {
  const [theme, setTheme] = useState('light')
  const navigate = useNavigate()

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light')
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const getFirstName = () => {
    const fullName = session?.user?.user_metadata?.full_name
    if (fullName) {
      return fullName.split(' ')[0]
    }
    const email = session?.user?.email
    return email ? email.split('@')[0] : 'Student'
  }

  const firstName = getFirstName()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/logo.svg" alt="HN" />
          <span>Haramaya Navigator</span>
        </div>
        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <div className="welcome-box">
            <span className="welcome-text">Welcome, {firstName}</span>
          </div>
          <button className="sign-out-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
