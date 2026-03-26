import './ProgressBar.css'

export function ProgressBar({ value = 0, current, total }) {
  const pct = Math.min(100, Math.max(0, value))

  return (
    <div className="progress">
      {current != null && total != null && (
        <p className="progress__label">{current} de {total}</p>
      )}
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-live="polite"
      >
        <div className="progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
