import { useState } from 'react'
import { giftData } from '../../data/giftData'
import { EmptySection } from '../Timeline/Timeline'

export default function Quiz() {
  const questions = giftData.quiz
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  if (!questions?.length) return <EmptySection title="How Well Do You Know Us" />

  const q = questions[step]

  function choose(option) {
    if (revealed) return
    setSelected(option)
    setRevealed(true)
    if (option === q.myAnswer) setCorrectCount((c) => c + 1)
  }

  function next() {
    if (step === questions.length - 1) {
      setFinished(true)
      return
    }
    setStep((s) => s + 1)
    setSelected(null)
    setRevealed(false)
  }

  function restart() {
    setStep(0)
    setSelected(null)
    setRevealed(false)
    setCorrectCount(0)
    setFinished(false)
  }

  if (finished) {
    return (
      <div className="screen screen--center quiz">
        <div className="screen__inner fade-in">
          <p className="eyebrow">A very serious investigation</p>
          <div className="quiz__celebrate">
            <h1 className="heading-l">
              {giftData.quizShowScore
                ? `${correctCount} out of ${questions.length}`
                : giftData.quizResult}
            </h1>
          </div>
          <button className="btn btn--ghost" onClick={restart}>
            Take it again
          </button>
        </div>
      </div>
    )
  }

  const progress = ((step + (revealed ? 1 : 0)) / questions.length) * 100

  return (
    <div className="screen quiz">
      <div className="screen__inner">
        <p className="eyebrow">A very serious investigation</p>
        <h1 className="heading-l">Let's see how well you remember us.</h1>

        <div className="quiz__progress" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={questions.length}>
          <div className="quiz__progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="body-text body-text--soft">
          Question {step + 1} of {questions.length}
        </p>

        <div className="quiz__card fade-up" key={step}>
          <h2 className="heading-l quiz__question">{q.question}</h2>
          <div className="quiz__options">
            {q.options.map((opt) => {
              const isChosen = selected === opt
              const isAnswer = revealed && opt === q.myAnswer
              return (
                <button
                  key={opt}
                  className={`quiz__option ${isChosen ? 'is-chosen' : ''} ${isAnswer ? 'is-answer glow-gold' : ''}`}
                  onClick={() => choose(opt)}
                  disabled={revealed}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {revealed && (
            <div className="quiz__reveal fade-in">
              <p className="body-text">
                <strong>My answer:</strong> {q.myAnswer}
              </p>
              <p className="body-text body-text--soft">{q.reason}</p>
              <button className="btn btn--primary" onClick={next}>
                {step === questions.length - 1 ? 'See the result' : 'Next question'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
