import './Badge.css'

export function Badge({ variant = 'locked', children }) {
  if (variant === 'locked') {
    return (
      <span className="badge badge--locked" aria-label="Conteúdo bloqueado">
        🔒 Bloqueado
      </span>
    )
  }

  return (
    <span className={`badge badge--${variant}`}>
      {children}
    </span>
  )
}
