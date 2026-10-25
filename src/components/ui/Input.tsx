import type { ComponentPropsWithoutRef } from 'react'
import { cx } from './cx'

const FIELD_CLASSES =
  'py-2.5 sm:py-3 px-4 rounded-full block w-full bg-layer border-layer-line sm:text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary-focus focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none'

export function Input({ className, ...rest }: ComponentPropsWithoutRef<'input'>) {
  return <input className={cx(FIELD_CLASSES, className)} {...rest} />
}

export function Textarea({ className, ...rest }: ComponentPropsWithoutRef<'textarea'>) {
  return (
    <textarea
      className={cx(FIELD_CLASSES.replace('rounded-full', 'rounded-2xl'), className)}
      {...rest}
    />
  )
}

export function Select({ className, ...rest }: ComponentPropsWithoutRef<'select'>) {
  return <select className={cx(FIELD_CLASSES, className)} {...rest} />
}
