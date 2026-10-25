import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { EMAIL, LOCATION } from '../../data/site'
import { useI18n } from '../../i18n/I18nProvider'
import type { StringKey } from '../../i18n/translations'
import { ApiService, type ContactInput } from '../../services/api'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { cx } from '../ui/cx'
import { Input, Textarea } from '../ui/Input'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** Same pattern as the legacy FormManager. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
/** The feedback message disappears after this many milliseconds. */
const FEEDBACK_TIMEOUT_MS = 5000

type FeedbackType = 'info' | 'success' | 'error'
interface Feedback {
  type: FeedbackType
  messageKey: StringKey
}

const EMPTY_FORM = { name: '', email: '', phone: '', message: '' }

const FEEDBACK_CLASSES: Record<FeedbackType, string> = {
  info: 'border-layer-line bg-layer text-foreground',
  success: 'border-green-500/40 bg-green-500/10 text-green-400',
  error: 'border-red-500/40 bg-red-500/10 text-red-400',
}

function validate(values: ContactInput): StringKey | null {
  if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
    return 'contact.form.validation.required'
  }
  if (!EMAIL_PATTERN.test(values.email)) return 'contact.form.validation.email'
  return null
}

function ContactDetail({ icon, labelKey, value }: { icon: string; labelKey: StringKey; value: string }) {
  const { t } = useI18n()

  return (
    <li className="flex items-center gap-4">
      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl text-primary">
        <i className={`bi ${icon}`} aria-hidden="true" />
      </span>
      <span className="flex flex-col">
        <span className="text-xs font-semibold tracking-wide text-muted-foreground-1 uppercase">
          {t(labelKey)}
        </span>
        <span className="text-foreground">{value}</span>
      </span>
    </li>
  )
}

export function Contact() {
  const { t } = useI18n()
  const [values, setValues] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  useEffect(() => {
    if (!feedback) return
    const timer = setTimeout(() => setFeedback(null), FEEDBACK_TIMEOUT_MS)
    return () => clearTimeout(timer)
  }, [feedback])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return

    const invalidKey = validate(values)
    if (invalidKey) {
      setFeedback({ type: 'error', messageKey: invalidKey })
      return
    }

    setSubmitting(true)
    setFeedback({ type: 'info', messageKey: 'contact.form.sending' })
    // ApiService falls back to localStorage when the API is unavailable.
    const saved = await ApiService.createMessage(values)
    setSubmitting(false)

    if (saved) {
      setFeedback({ type: 'success', messageKey: 'contact.form.success' })
      setValues(EMPTY_FORM)
    } else {
      setFeedback({ type: 'error', messageKey: 'contact.form.error' })
    }
  }

  const labelClasses = 'mb-2 block text-sm font-medium text-foreground'

  return (
    <section id="contact" className="scroll-mt-20 bg-background py-24">
      <Container>
        <SectionHeading
          tagKey="contact.tag"
          titleKey="contact.title"
          subtitleKey="contact.subtitle"
          tone="dark"
        />
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal delay={300}>
            <h3
              className="mb-4 text-3xl font-bold text-foreground [&_.text-accent]:text-primary"
              dangerouslySetInnerHTML={{ __html: t('contact.infoTitle') }}
            />
            <p className="mb-8 leading-8 text-muted-foreground-1">{t('contact.infoText')}</p>
            <ul className="flex flex-col gap-6">
              <ContactDetail icon="bi-envelope" labelKey="contact.form.email" value={EMAIL} />
              <ContactDetail icon="bi-geo-alt" labelKey="contact.label.location" value={LOCATION} />
              <ContactDetail
                icon="bi-clock"
                labelKey="contact.label.availability"
                value={t('contact.val.availability')}
              />
            </ul>
          </Reveal>

          <Reveal delay={400}>
            <form id="contactForm" noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className={labelClasses}>
                  {t('contact.form.name')}
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  disabled={submitting}
                  value={values.name}
                  onChange={handleChange}
                  placeholder={t('contact.form.namePh')}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>
                  {t('contact.form.email')}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={submitting}
                  value={values.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClasses}>
                  {t('contact.form.phone')}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  disabled={submitting}
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label htmlFor="message" className={labelClasses}>
                  {t('contact.form.message')}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  disabled={submitting}
                  value={values.message}
                  onChange={handleChange}
                  placeholder={t('contact.form.messagePh')}
                />
              </div>
              <Button type="submit" variant="primary" disabled={submitting} className="w-full justify-center">
                <i className="bi bi-send" aria-hidden="true" />
                {t('contact.form.submit')}
              </Button>
              <div role="status" aria-live="polite">
                {feedback && (
                  <p
                    className={cx(
                      'rounded-2xl border px-4 py-3 text-sm',
                      FEEDBACK_CLASSES[feedback.type],
                    )}
                  >
                    {t(feedback.messageKey)}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
