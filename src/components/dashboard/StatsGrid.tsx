import type { MessageStats } from './messageUtils'
import { DASHBOARD_TEXT } from './strings'

const CARDS: Array<{ key: keyof MessageStats; icon: string; label: string }> = [
  { key: 'total', icon: 'bi-envelope', label: DASHBOARD_TEXT.stats.total },
  { key: 'today', icon: 'bi-calendar-day', label: DASHBOARD_TEXT.stats.today },
  { key: 'last24h', icon: 'bi-clock', label: DASHBOARD_TEXT.stats.last24h },
]

export function StatsGrid({ stats }: { stats: MessageStats }) {
  return (
    <section aria-label={DASHBOARD_TEXT.stats.label}>
      <ul className="grid gap-4 sm:grid-cols-3">
        {CARDS.map(({ key, icon, label }) => (
          <li
            key={key}
            className="flex items-center gap-4 rounded-2xl border border-layer-line bg-layer p-5"
          >
            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
              <i className={`bi ${icon}`} aria-hidden="true" />
            </span>
            <div>
              <p className="text-3xl font-bold text-foreground">{stats[key]}</p>
              <p className="text-sm text-muted-foreground-1">{label}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
