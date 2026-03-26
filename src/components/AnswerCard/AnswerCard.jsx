import './AnswerCard.css'

export function AnswerCard({ text, selected = false, onClick, disabled = false }) {
  return (
    <button
      type="button"
      className={[
        'answer-card',
        selected && 'answer-card--selected',
        disabled && 'answer-card--disabled',
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      {text}
    </button>
  )
}
