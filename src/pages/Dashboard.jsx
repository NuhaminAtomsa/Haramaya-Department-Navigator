import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Dashboard.css'

function Dashboard({ session }) {
  const navigate = useNavigate()
  const [adviceIndex] = useState(Math.random() > 0.5 ? 0 : 1)

  const adviceCards = [
    {
      title: 'Before You Decide',
      text: "Choosing a department isn't about noise or pressure. It's about what you can grow with for years."
    },
    {
      title: 'Worth Thinking About',
      text: 'Trends fade. Skills stay. Your genuine interest matters as much as your GPA.'
    }
  ]

  const colleges = [
    {
      name: 'College of Health & Medical Sciences (CHMS)',
      description: 'Humanitarianism & precision - caring for people and animals',
      departments: ['Medicine', 'Nursing', 'Pharmacy', 'Medical Laboratory', 'Veterinary Medicine'],
      emoji: '🏥'
    },
    {
      name: 'College of Computing & Informatics (CCI)',
      description: 'Logic & digital creation - building the future with code',
      departments: ['Software Engineering', 'Computer Science', 'Information Systems', 'Information Technology', 'Statistics'],
      emoji: '💻'
    },
    {
      name: 'Haramaya Institute of Technology (HiT)',
      description: 'Design, physics & infrastructure - building what you can touch',
      departments: ['Civil Engineering', 'Hydraulics Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Chemical Engineering', 'Food Engineering'],
      emoji: '🏭'
    },
    {
      name: 'College of Agriculture & Environmental Sciences (CAES)',
      description: 'Sustainability & earth science - feeding the future',
      departments: ['Agribusiness', 'Agricultural Economics', 'Natural Resources', 'Environmental Science'],
      emoji: '🌱'
    },
    {
      name: 'College of Natural & Computational Sciences (CNCS)',
      description: 'Fundamental discovery - understanding how nature works',
      departments: ['Biotechnology', 'Applied Physics', 'Applied Mathematics'],
      emoji: '🔬'
    }
  ]

  return (
    <div className="dashboard">
      <Navbar session={session} />
      
      <main className="dashboard-content">
        <section className="hero">
          <h1 className="hero-title">
            🎓 Not sure which department fits you? Let's figure it out.
          </h1>
          <p className="hero-subtitle">
            Answer a few simple questions and see which department matches you — not the hype.
          </p>
        </section>

        <div className="advice-card">
          <div className="advice-content">
            <h3 className="advice-title">{adviceCards[adviceIndex].title}</h3>
            <p className="advice-text">{adviceCards[adviceIndex].text}</p>
          </div>
        </div>

        <div className="visual-transition">
          <div className="transition-line"></div>
        </div>

        <div className="cta-section">
          <button className="cta-button primary" onClick={() => navigate('/quiz')}>
            Start Journey
          </button>
        </div>

        <section className="colleges-section">
          <h2>Explore Colleges & Departments</h2>
          <p className="colleges-intro">
            Haramaya University has 5 colleges with 27 departments. Explore what each offers!
          </p>
          <div className="colleges-grid">
            {colleges.map((college, index) => (
              <div key={index} className="college-card">
                <span className="college-emoji">{college.emoji}</span>
                <h3>{college.name}</h3>
                <p className="college-description">{college.description}</p>
                <div className="departments-list">
                  {college.departments.map((dept, i) => (
                    <span key={i} className="department-tag">{dept}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reality-check">
          <h3>💡 Reality Check</h3>
          <p>
            Placement is competitive and based on your GPA. Our quiz helps you find departments that match your interests AND eligibility.
          </p>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default Dashboard
