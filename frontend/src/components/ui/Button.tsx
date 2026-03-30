import React from 'react'
import { cn } from '@/lib/utils'
import { ButtonProps } from '@/types/ui'

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = isLoading || disabled

    const baseClasses =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stellar-navy ' +
      'disabled:opacity-50 disabled:pointer-events-none select-none'

    const variantClasses: Record<string, string> = {
      primary:
        'bg-gold-500 text-stellar-navy hover:bg-gold-600 active:bg-gold-700',
      secondary:
        'bg-stellar-lightNavy text-stellar-white border border-stellar-slate ' +
        'hover:bg-stellar-navy hover:border-stellar-lightSlate active:bg-stellar-darkNavy',
      outline:
        'border border-stellar-slate bg-transparent text-stellar-lightSlate ' +
        'hover:bg-stellar-lightNavy hover:text-stellar-white active:bg-stellar-navy',
      ghost:
        'bg-transparent text-stellar-lightSlate ' +
        'hover:bg-stellar-lightNavy hover:text-stellar-white active:bg-stellar-navy',
      danger:
        'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
    }

    const sizeClasses: Record<string, string> = {
      sm: 'h-8 px-3 text-xs gap-1.5 rounded',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-11 px-6 text-base gap-2',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner />
            <span className="opacity-80">{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
