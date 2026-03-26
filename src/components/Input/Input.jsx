import './Input.css'

export function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  id,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="field">
      {label && (
        <label className="field__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`field__input${error ? ' field__input--error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className="field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
