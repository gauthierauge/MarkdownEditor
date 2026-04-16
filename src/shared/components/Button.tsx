import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { Button as ShadcnButton } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidth?: boolean
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  }
>

function Button({
  children,
  className = '',
  fullWidth = false,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const shadcnVariant =
    variant === 'primary'
      ? 'default'
      : variant === 'danger'
        ? 'destructive'
        : variant

  const classes = cn(fullWidth ? 'w-full' : '', className)

  return (
    <ShadcnButton className={classes} type={type} variant={shadcnVariant} {...props}>
      {children}
    </ShadcnButton>
  )
}

export default Button
