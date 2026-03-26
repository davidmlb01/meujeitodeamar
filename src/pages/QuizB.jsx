import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ProgressBar, AnswerCard } from '../components'
import { QUESTIONS, INTRO, TRANSITION } from '../data/questions'
import { calcularEstilo } from '../data/scoring'
import './QuizB.css'

const STORAGE_KEY = 'mjda_quiz_state'

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage indisponível — continua sem persistência
  }
}

function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {}
}

export default function QuizB() {
  const navigate = useNavigate()
  const saved = loadState()

  const [screen, setScreen] = useState(saved?.started ? 'question' : 'intro')
  const [currentIndex, setCurrentIndex] = useState(saved?.currentIndex ?? 0)
  const [answers, setAnswers] = useState(saved?.answers ?? [])
  const [selecting, setSelecting] = useState(false) // bloqueia duplo clique

  // Salva estado sempre que muda
  useEffect(() => {
    if (screen === 'question') {
      saveState({ started: true, currentIndex, answers })
    }
  }, [screen, currentIndex, answers])

  const handleStart = () => setScreen('question')

  const handleAnswer = useCallback((optionId) => {
    if (selecting) return
    setSelecting(true)

    const newAnswers = [...answers, optionId]

    // Avança após 400ms (feedback visual antes de trocar)
    setTimeout(() => {
      if (newAnswers.length === QUESTIONS.length) {
        setAnswers(newAnswers)
        setScreen('transition')
        clearState()

        // Navega após delay da tela de transição
        setTimeout(() => {
          const estilo = calcularEstilo(newAnswers)
          navigate(`/resultado/${estilo}`)
        }, TRANSITION.delay)
      } else {
        setAnswers(newAnswers)
        setCurrentIndex(currentIndex + 1)
        setSelecting(false)
      }
    }, 400)
  }, [answers, currentIndex, selecting, navigate])

  const question = QUESTIONS[currentIndex]
  const progress = Math.round((currentIndex / QUESTIONS.length) * 100)

  if (screen === 'intro') {
    return (
      <div className="quiz">
        <div className="quiz__body">
          <div className="quiz__intro">
            <h1 className="quiz__intro-title">{INTRO.title}</h1>
            <p className="quiz__intro-body">{INTRO.body}</p>
            <Button onClick={handleStart}>{INTRO.cta}</Button>
          </div>
        </div>
      </div>
    )
  }

  if (screen === 'transition') {
    return (
      <div className="quiz">
        <div className="quiz__body">
          <div className="quiz__transition">
            <h1 className="quiz__transition-title">{TRANSITION.title}</h1>
            <p className="quiz__transition-body">{TRANSITION.body}</p>
            <div className="quiz__transition-dots" aria-hidden="true">
              <span className="quiz__transition-dot" />
              <span className="quiz__transition-dot" />
              <span className="quiz__transition-dot" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz">
      <header className="quiz__header">
        <p className="quiz__site-name">meujeitodeamar</p>
        <ProgressBar
          value={progress}
          current={currentIndex + 1}
          total={QUESTIONS.length}
        />
      </header>

      <div className="quiz__body">
        <div className="quiz__question" key={currentIndex}>
          <h2 className="quiz__question-text">{question.text}</h2>
          <div className="quiz__options" role="group" aria-label="Opções de resposta">
            {question.options.map((opt) => (
              <AnswerCard
                key={opt.id}
                text={opt.text}
                selected={false}
                disabled={selecting}
                onClick={() => handleAnswer(opt.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
