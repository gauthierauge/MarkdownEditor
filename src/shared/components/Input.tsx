import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hint?: string
  label?: string
}

function Input({ className = '', hint, id, label, ...props }: InputProps) {
  const input = (
    <input
      className={['ui-input', className].filter(Boolean).join(' ')}
      id={id}
      {...props}
    />
  )

  if (!label) {
    return input
  }

  return (
    <label className="ui-field" htmlFor={id}>
      <span className="ui-field__label">{label}</span>
      {input}
      {hint ? <span className="ui-field__hint">{hint}</span> : null}
    </label>
  )
}

export default Input
