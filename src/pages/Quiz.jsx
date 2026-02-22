import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Quiz.css'

function Quiz({ session }) {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [gpa, setGpa] = useState('')

  const questions = [
    {
      id: 'work_with',
      question: 'What do you prefer working with?',
      options: [
        { value: 'people', label: 'People (helping, teaching, caring)', score: { health: 5, agriculture: 3 } },
        { value: 'technology', label: 'Technology & Computers (coding, systems)', score: { computing: 5, engineering: 2 } },
        { value: 'machines', label: 'Machines & Physical Things (building, fixing)', score: { engineering: 5, agriculture: 2 } },
        { value: 'nature', label: 'Nature & Animals (environment, farming)', score: { agriculture: 5, health: 2 } },
        { value: 'data', label: 'Data & Numbers (analysis, patterns)', score: { computing: 4, sciences: 3 } }
      ]
    },
    {
      id: 'work_environment',
      question: 'What work environment suits you best?',
      options: [
        { value: 'hospital', label: 'Hospital or Clinic (medical care)', score: { health: 5 } },
        { value: 'office_computer', label: 'Office with Computer (desk work)', score: { computing: 5, sciences: 2 } },
        { value: 'lab', label: 'Laboratory (experiments, research)', score: { sciences: 5, health: 3 } },
        { value: 'field', label: 'Field or Outdoors (hands-on, active)', score: { agriculture: 5, engineering: 3 } },
        { value: 'workshop', label: 'Workshop or Construction Site', score: { engineering: 5 } }
      ]
    },
    {
      id: 'strength',
      question: 'What is your biggest strength?',
      options: [
        { value: 'empathy', label: 'Empathy & Caring for Others', score: { health: 5, agriculture: 2 } },
        { value: 'logic', label: 'Logical Thinking & Problem Solving', score: { computing: 5, engineering: 4, sciences: 3 } },
        { value: 'creativity', label: 'Creativity & Innovation', score: { engineering: 4, computing: 3 } },
        { value: 'memory', label: 'Strong Memory & Detail-Oriented', score: { health: 4, sciences: 4 } },
        { value: 'communication', label: 'Communication & Leadership', score: { agriculture: 4, health: 3 } }
      ]
    },
    {
      id: 'subject_preference',
      question: 'Which subjects do you enjoy most?',
      options: [
        { value: 'bio_chem', label: 'Biology & Chemistry', score: { health: 5, sciences: 4, agriculture: 3 } },
        { value: 'math_physics', label: 'Mathematics & Physics', score: { engineering: 5, computing: 4, sciences: 3 } },
        { value: 'math_only', label: 'Mathematics (pure)', score: { computing: 5, sciences: 4 } },
        { value: 'sciences', label: 'All Sciences Equally', score: { sciences: 5, health: 2 } },
        { value: 'practical', label: 'Practical/Applied Subjects', score: { engineering: 4, agriculture: 4 } }
      ]
    },
    {
      id: 'career_goal',
      question: 'What is your main career goal?',
      options: [
        { value: 'save_lives', label: 'Save Lives & Help Sick People', score: { health: 5 } },
        { value: 'build_tech', label: 'Build Software & Technology', score: { computing: 5 } },
        { value: 'design_build', label: 'Design & Build Physical Things', score: { engineering: 5 } },
        { value: 'research', label: 'Research & Discover New Things', score: { sciences: 5, health: 2 } },
        { value: 'sustainability', label: 'Work with Nature & Sustainability', score: { agriculture: 5, sciences: 2 } }
      ]
    },
    {
      id: 'comfort_level',
      question: 'Which are you most comfortable with?',
      options: [
        { value: 'blood_medical', label: 'Blood, Hospitals & Medical Situations', score: { health: 5 } },
        { value: 'long_screen', label: 'Long Hours at Computer Screen', score: { computing: 5, sciences: 2 } },
        { value: 'physical_work', label: 'Physical & Manual Work', score: { engineering: 5, agriculture: 4 } },
        { value: 'animals', label: 'Working with Animals', score: { agriculture: 5, health: 3 } },
        { value: 'complex_problems', label: 'Solving Complex Abstract Problems', score: { computing: 4, sciences: 5, engineering: 3 } }
      ]
    }
  ]

  const totalSteps = questions.length + 1 // questions + GPA

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    const results = calculateRecommendation(answers, parseFloat(gpa))
    localStorage.setItem('quizResults', JSON.stringify(results))
    navigate('/results')
  }

  const calculateRecommendation = (answers, userGPA) => {
    // Calculate scores for each field based on answers
    const fieldScores = {
      health: 0,
      computing: 0,
      engineering: 0,
      agriculture: 0,
      sciences: 0
    }

    // Sum up scores from all answers
    questions.forEach(q => {
      const answer = answers[q.id]
      if (answer) {
        const selectedOption = q.options.find(opt => opt.value === answer)
        if (selectedOption && selectedOption.score) {
          Object.keys(selectedOption.score).forEach(field => {
            if (fieldScores[field] !== undefined) {
              fieldScores[field] += selectedOption.score[field]
            }
          })
        }
      }
    })

    // Department database with GPA requirements
    const departments = {
      'Medicine': { minGPA: 3.85, maxGPA: 4.0, emoji: '👨‍⚕️', college: 'CHMS', field: 'health' },
      'Nursing': { minGPA: 3.20, maxGPA: 3.50, emoji: '👩‍⚕️', college: 'CHMS', field: 'health' },
      'Pharmacy': { minGPA: 3.20, maxGPA: 3.50, emoji: '💊', college: 'CHMS', field: 'health' },
      'Medical Laboratory': { minGPA: 3.20, maxGPA: 3.50, emoji: '🔬', college: 'CHMS', field: 'health' },
      'Veterinary Medicine': { minGPA: 3.20, maxGPA: 4.0, emoji: '🐾', college: 'CHMS', field: 'health' },
      
      'Software Engineering': { minGPA: 3.40, maxGPA: 4.0, emoji: '👨‍💻', college: 'CCI', field: 'computing' },
      'Computer Science': { minGPA: 3.0, maxGPA: 4.0, emoji: '💻', college: 'CCI', field: 'computing' },
      'Information Systems': { minGPA: 3.0, maxGPA: 4.0, emoji: '🧑‍💼', college: 'CCI', field: 'computing' },
      'Information Technology': { minGPA: 3.0, maxGPA: 4.0, emoji: '🖥️', college: 'CCI', field: 'computing' },
      'Statistics': { minGPA: 2.0, maxGPA: 2.5, emoji: '📊', college: 'CCI', field: 'computing' },
      
      'Civil Engineering': { minGPA: 3.0, maxGPA: 3.65, emoji: '🏗️', college: 'HiT', field: 'engineering' },
      'Hydraulics Engineering': { minGPA: 3.0, maxGPA: 3.65, emoji: '💧', college: 'HiT', field: 'engineering' },
      'Electrical Engineering': { minGPA: 3.0, maxGPA: 3.65, emoji: '⚡', college: 'HiT', field: 'engineering' },
      'Mechanical Engineering': { minGPA: 3.0, maxGPA: 3.65, emoji: '⚙️', college: 'HiT', field: 'engineering' },
      'Chemical Engineering': { minGPA: 2.50, maxGPA: 3.65, emoji: '🧪', college: 'HiT', field: 'engineering' },
      'Food Engineering': { minGPA: 2.50, maxGPA: 3.65, emoji: '🍞', college: 'HiT', field: 'engineering' },
      
      'Agribusiness': { minGPA: 2.0, maxGPA: 3.0, emoji: '🌾', college: 'CAES', field: 'agriculture' },
      'Agricultural Economics': { minGPA: 2.0, maxGPA: 3.0, emoji: '📈', college: 'CAES', field: 'agriculture' },
      'Natural Resources': { minGPA: 2.0, maxGPA: 3.0, emoji: '🌳', college: 'CAES', field: 'agriculture' },
      'Environmental Science': { minGPA: 2.0, maxGPA: 3.0, emoji: '🌍', college: 'CAES', field: 'agriculture' },
      
      'Biotechnology': { minGPA: 2.80, maxGPA: 4.0, emoji: '🧬', college: 'CNCS', field: 'sciences' },
      'Applied Physics': { minGPA: 2.0, maxGPA: 3.20, emoji: '⚛️', college: 'CNCS', field: 'sciences' },
      'Applied Mathematics': { minGPA: 2.0, maxGPA: 3.20, emoji: '🔢', college: 'CNCS', field: 'sciences' }
    }

    // Calculate final scores (interest 40% + GPA 60%)
    const interestWeight = 0.4
    const gpaWeight = 0.6

    const scored = Object.entries(departments).map(([name, data]) => {
      let score = 0
      
      // Interest score from field match
      score += (fieldScores[data.field] || 0) * interestWeight
      
      // GPA score
      if (userGPA >= data.minGPA && userGPA <= data.maxGPA) {
        score += 10 * gpaWeight
      } else if (userGPA >= data.minGPA - 0.2 && userGPA < data.minGPA) {
        score += 5 * gpaWeight
      } else if (userGPA > data.maxGPA) {
        score += 8 * gpaWeight
      }
      
      return {
        name,
        ...data,
        score,
        eligible: userGPA >= data.minGPA
      }
    })

    // Sort by score
    const sorted = scored.sort((a, b) => b.score - a.score)
    const bestMatch = sorted.find(d => d.eligible) || sorted[0]
    const planB = sorted.filter(d => d.eligible && d.name !== bestMatch.name).slice(0, 3)
    const reachOptions = sorted.filter(d => !d.eligible && d.minGPA - userGPA <= 0.3 && d.score > 2).slice(0, 2)

    return {
      recommended: bestMatch.name,
      emoji: bestMatch.emoji,
      score: bestMatch.score,
      college: bestMatch.college,
      minGPA: bestMatch.minGPA,
      eligible: bestMatch.eligible,
      userGPA: userGPA,
      planB: planB,
      reachOptions: reachOptions,
      allScores: sorted,
      answers: answers
    }
  }

  const isStepComplete = () => {
    if (currentStep < questions.length) {
      return answers[questions[currentStep].id] !== undefined
    } else {
      return gpa !== '' && parseFloat(gpa) >= 0 && parseFloat(gpa) <= 4.0
    }
  }

  return (
    <div className="quiz">
      <Navbar session={session} />
      
      <main className="quiz-content">
        <div className="quiz-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
          
          <p className="progress-text">
            Step {currentStep + 1} of {totalSteps}
          </p>

          {currentStep < questions.length ? (
            <div className="question-card">
              <h2>{questions[currentStep].question}</h2>
              <div className="options-container">
                {questions[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-btn ${answers[questions[currentStep].id] === option.value ? 'selected' : ''}`}
                    onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                  >
                    <span className="option-check">{answers[questions[currentStep].id] === option.value ? '✓' : ''}</span>
                    <span className="option-label">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grades-card">
              <h2>📊 Enter Your Freshman GPA</h2>
              <p className="grades-subtitle">
                Your GPA determines which departments you're eligible for. Be honest!
              </p>
              
              <div className="gpa-form">
                <div className="gpa-input-group">
                  <label htmlFor="gpa">Freshman GPA (0.0 - 4.0)</label>
                  <input
                    id="gpa"
                    type="number"
                    min="0"
                    max="4.0"
                    step="0.01"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    placeholder="e.g., 3.45"
                  />
                  <p className="gpa-hint">
                    💡 Don't know your GPA yet? Use your expected range based on current grades.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="quiz-actions">
            <button 
              className="btn-secondary" 
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </button>
            
            {currentStep < totalSteps - 1 ? (
              <button 
                className="btn-primary" 
                onClick={handleNext}
                disabled={!isStepComplete()}
              >
                Next
              </button>
            ) : (
              <button 
                className="btn-primary" 
                onClick={handleSubmit}
                disabled={!isStepComplete()}
              >
                See Results 🎓
              </button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default Quiz
