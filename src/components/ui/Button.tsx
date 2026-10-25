import type { ComponentPropsWithoutRef } from 'react'
import { cx } from './cx'

export type ButtonVariant = 'primary' | 'secondary'

export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-hover disabled:opacity-50 disabled:pointer-events-none',
  secondary:
    'py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full bg-layer border border-layer-line text-layer-foreground shadow-2xs hover:bg-layer-hover focus:outline-hidden focus:bg-layer-hover disabled:opacity-50 disabled:pointer-events-none',
}

type ButtonOwnProps = { variant?: ButtonVariant }

type ButtonAsButton = ButtonOwnProps &
  ComponentPropsWithoutRef<'button'> & { as?: 'button' }

type ButtonAsAnchor = ButtonOwnProps &
  ComponentPropsWithoutRef<'a'> & { as: 'a' }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

export function Button(props: ButtonProps) {
  if (props.as === 'a') {
    const { as: _as, variant = 'primary', className, ...rest } = props
    return <a className={cx(BUTTON_VARIANT_CLASSES[variant], className)} {...rest} />
  }

  const { as: _as, variant = 'primary', className, type = 'button', ...rest } = props
  return (
    <button
      type={type}
      className={cx(BUTTON_VARIANT_CLASSES[variant], className)}
      {...rest}
    />
  )
}
