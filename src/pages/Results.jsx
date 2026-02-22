import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Results.css'

function Results({ session }) {
  const navigate = useNavigate()
  const [results, setResults] = useState(null)

  useEffect(() => {
    const storedResults = localStorage.getItem('quizResults')
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    } else {
      navigate('/dashboard')
    }
  }, [navigate])

  if (!results) {
    return <div>Loading...</div>
  }

  const getReasonText = (department, college) => {
    const reasons = {
      'Medicine': 'You show strong empathy, comfort with medical situations, and dedication to helping people. Medicine could be your calling.',
      'Nursing': 'Your caring nature and people skills make Nursing a great fit. You can make a real difference in patients\' lives.',
      'Pharmacy': 'Your chemistry interest and desire to help people align perfectly with Pharmacy. You\'ll be the science behind healing.',
      'Medical Laboratory': 'Your attention to detail and scientific curiosity make Medical Laboratory work ideal for you.',
      'Veterinary Medicine': 'Your love for animals and public health awareness make Veterinary Medicine a strong match.',
      
      'Software Engineering': 'You enjoy problem-solving and logical thinking. Software Engineering lets you build the digital future.',
      'Computer Science': 'Your analytical mind and love for technology make Computer Science perfect for you.',
      'Information Systems': 'You balance technical skills with business thinking. Information Systems is your sweet spot.',
      'Information Technology': 'Your tech interest and practical mindset align well with IT. You\'ll keep systems running smoothly.',
      'Statistics': 'Your pattern recognition and data skills make Statistics a great choice. Numbers tell stories through you.',
      
      'Civil Engineering': 'You like building physical structures and solving real-world problems. Civil Engineering is your path.',
      'Hydraulics Engineering': 'Your interest in water systems and infrastructure makes Hydraulics Engineering a solid choice.',
      'Electrical Engineering': 'Your curiosity about how things work internally aligns with Electrical Engineering.',
      'Mechanical Engineering': 'Your hands-on approach and technical mindset suit Mechanical Engineering perfectly.',
      'Chemical Engineering': 'Your interest in transformation of materials makes Chemical Engineering a great fit.',
      'Food Engineering': 'Your interest in food science and engineering makes this a unique and valuable path.',
      
      'Agribusiness': 'Your business mindset and interest in agriculture make Agribusiness a smart choice.',
      'Agricultural Economics': 'You see farming as an industry. Agricultural Economics lets you optimize it.',
      'Natural Resources': 'Your environmental awareness and outdoor preference align with Natural Resources management.',
      'Environmental Science': 'Your passion for conservation and sustainability makes Environmental Science perfect.',
      
      'Biotechnology': 'Your interest in genetics and bio-innovation makes Biotechnology an exciting path.',
      'Applied Physics': 'Your deep curiosity about natural laws makes Applied Physics your calling.',
      'Applied Mathematics': 'Your love for abstract thinking and problem-solving aligns with Applied Mathematics.'
    }
    return reasons[department] || 'Based on your interests and GPA, this department matches your profile well.'
  }

  const getCompetitivenessText = (minGPA, userGPA) => {
    const diff = userGPA - minGPA
    if (diff >= 0.5) return { text: 'Strong chance', color: 'green' }
    if (diff >= 0.2) return { text: 'Good chance', color: 'green' }
    if (diff >= 0) return { text: 'Competitive', color: 'orange' }
    if (diff >= -0.2) return { text: 'Reach (close!)', color: 'orange' }
    return { text: 'Not eligible', color: 'red' }
  }

  const competitiveness = getCompetitivenessText(results.minGPA, results.userGPA)

  return (
    <div className="results">
      <Navbar session={session} />
      
      <main className="results-content">
        <div className="results-container">
          <div className="results-header">
            <h1>Your Results Are In! 🎉</h1>
            <p className="results-subtitle">Based on your interests and GPA: {results.userGPA.toFixed(2)}</p>
          </div>

          <div className="recommendation-card">
            <span className="dept-emoji-large">{results.emoji}</span>
            <h2>We recommend:</h2>
            <h3 className="dept-name">{results.recommended}</h3>
            <span className="college-badge">{results.college}</span>
            
            <div className="eligibility-status">
              <span className={`status-badge ${competitiveness.color}`}>
                {competitiveness.text}
              </span>
              <p className="gpa-requirement">
                Required GPA: {results.minGPA.toFixed(2)}+ | Your GPA: {results.userGPA.toFixed(2)}
              </p>
            </div>

            <div className="score-display">
              <div className="score-bar">
                <div 
                  className="score-fill" 
                  style={{ width: `${(results.score / 10) * 100}%` }}
                />
              </div>
              <span className="score-text">Match Score: {((results.score / 10) * 100).toFixed(0)}%</span>
            </div>
          </div>

          <div className="reason-card">
            <h3>Why this department?</h3>
            <p>{getReasonText(results.recommended, results.college)}</p>
          </div>

          {!results.eligible && (
            <div className="warning-card">
              <h3>⚠️ GPA Notice</h3>
              <p>
                Your current GPA ({results.userGPA.toFixed(2)}) is below the minimum for {results.recommended} ({results.minGPA.toFixed(2)}).
                This is still your best interest match! Consider it a goal to work toward, and check out the Plan B options below.
              </p>
            </div>
          )}

          {results.planB && results.planB.length > 0 && (
            <div className="plan-b-section">
              <h3>📋 Plan B Options (You're Eligible!)</h3>
              <p className="plan-b-intro">
                These departments match your interests AND your GPA. Smart to have backups!
              </p>
              <div className="options-list">
                {results.planB.map((dept, index) => {
                  const comp = getCompetitivenessText(dept.minGPA, results.userGPA)
                  return (
                    <div key={index} className="option-item">
                      <span className="option-emoji">{dept.emoji}</span>
                      <div className="option-info">
                        <div className="option-header">
                          <span className="option-name">{dept.name}</span>
                          <span className={`option-status ${comp.color}`}>{comp.text}</span>
                        </div>
                        <span className="option-college">{dept.college}</span>
                        <span className="option-gpa">Required: {dept.minGPA.toFixed(2)}+</span>
                        <div className="option-score-bar">
                          <div 
                            className="option-score-fill" 
                            style={{ width: `${(dept.score / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="option-percentage">{((dept.score / 10) * 100).toFixed(0)}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {results.reachOptions && results.reachOptions.length > 0 && (
            <div className="reach-section">
              <h3>🎯 Reach Options (Work Hard!)</h3>
              <p className="reach-intro">
                You're close to these! Improve your GPA by {(results.reachOptions[0].minGPA - results.userGPA).toFixed(2)} points to be eligible.
              </p>
              <div className="options-list">
                {results.reachOptions.map((dept, index) => (
                  <div key={index} className="option-item reach">
                    <span className="option-emoji">{dept.emoji}</span>
                    <div className="option-info">
                      <div className="option-header">
                        <span className="option-name">{dept.name}</span>
                        <span className="option-status orange">Reach</span>
                      </div>
                      <span className="option-college">{dept.college}</span>
                      <span className="option-gpa">Need: {dept.minGPA.toFixed(2)}+ (Gap: {(dept.minGPA - results.userGPA).toFixed(2)})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="reality-check-results">
            <h3>💡 Remember</h3>
            <p>
              <strong>Placement is competitive.</strong> Even if you meet the minimum GPA, students with higher GPAs get priority.
              Having a Plan B (and Plan C!) is smart.
            </p>
            <p>
              <strong>This is guidance, not a guarantee.</strong> During Orientation Week, visit labs, talk to seniors,
              and trust your gut. Your interests matter as much as your GPA.
            </p>
            <p>
              <strong>You can improve your GPA!</strong> If you're close to a reach option, focus on your studies.
              Small improvements can open new doors.
            </p>
          </div>

          <div className="results-actions">
            <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
              Back to Home
            </button>
            <button className="btn-primary" onClick={() => navigate('/quiz')}>
              Retake Quiz
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default Results
