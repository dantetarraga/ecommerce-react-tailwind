import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'bg-ink text-white hover:bg-ink-soft',
  accent: 'bg-accent-500 text-ink hover:bg-accent-400',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-white',
  outline: 'border border-line bg-white text-ink hover:border-ink',
  ghost: 'text-ink hover:bg-surface-muted',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  light: 'bg-white text-ink hover:bg-surface-muted'
}

const SIZES = {
  sm: 'h-9 px-4 text-sm gap-2',
  md: 'h-11 px-6 text-sm gap-2',
  lg: 'h-12 px-8 text-base gap-3',
  icon: 'h-10 w-10 shrink-0'
}

// Renders a router Link when `to` is given, otherwise a button
const Button = forwardRef(({ to, variant = 'primary', size = 'md', fullWidth = false, className = '', children, ...props }, ref) => {
  const classes = [
    'inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-200',
    'disabled:cursor-not-allowed disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? 'w-full' : '',
    className
  ].join(' ')

  if (to) {
    return <Link ref={ref} to={to} className={classes} {...props}>{children}</Link>
  }

  return <button ref={ref} type='button' className={classes} {...props}>{children}</button>
})

Button.displayName = 'Button'

export default Button
