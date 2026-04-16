import type { InputHTMLAttributes } from 'react'
import { Input as ShadcnInput } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hint?: string
  label?: string
}

function Input({ className = '', hint, id, label, ...props }: InputProps) {
  const input = (
    <ShadcnInput className={cn(className)} id={id} {...props} />
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
