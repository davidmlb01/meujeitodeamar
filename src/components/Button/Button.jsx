import './Button.css'

export function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {children}
    </button>
  )
}
