import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Quiz from './pages/Quiz'
import Results from './pages/Results'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 3000)

    // Check active session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session)
        setLoading(false)
        clearTimeout(timeout)
      })
      .catch((error) => {
        console.error('Auth error:', error)
        setLoading(false)
        clearTimeout(timeout)
      })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!session ? <Login /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/dashboard" 
          element={session ? <Dashboard session={session} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/quiz" 
          element={session ? <Quiz session={session} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/results" 
          element={session ? <Results session={session} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={session ? "/dashboard" : "/login"} />} 
        />
      </Routes>
    </Router>
  )
}

export default App
