import { Input, Select } from '../ui/Input'
import type { DateFilter, MessageFilters, StatusFilter } from './messageUtils'
import { DASHBOARD_TEXT } from './strings'

interface FiltersProps {
  filters: MessageFilters
  onChange: (filters: MessageFilters) => void
}

const { filters: TEXT } = DASHBOARD_TEXT

export function Filters({ filters, onChange }: FiltersProps) {
  return (
    <section
      aria-label={TEXT.label}
      className="flex flex-col gap-3 md:flex-row md:items-center"
    >
      <div className="relative flex-1">
        <label htmlFor="searchInput" className="sr-only">
          {TEXT.searchLabel}
        </label>
        <i
          className="bi bi-search pointer-events-none absolute inset-y-0 start-4 flex items-center text-muted-foreground-1"
          aria-hidden="true"
        />
        <Input
          id="searchInput"
          type="search"
          className="ps-11"
          placeholder={TEXT.searchPlaceholder}
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="statusFilter" className="sr-only">
          {TEXT.statusLabel}
        </label>
        <Select
          id="statusFilter"
          className="pe-10"
          value={filters.status}
          onChange={(event) =>
            onChange({ ...filters, status: event.target.value as StatusFilter })
          }
        >
          {(Object.keys(TEXT.status) as StatusFilter[]).map((value) => (
            <option key={value} value={value}>
              {TEXT.status[value]}
            </option>
          ))}
        </Select>
        <label htmlFor="dateFilter" className="sr-only">
          {TEXT.dateLabel}
        </label>
        <Select
          id="dateFilter"
          className="pe-10"
          value={filters.date}
          onChange={(event) => onChange({ ...filters, date: event.target.value as DateFilter })}
        >
          {(Object.keys(TEXT.date) as DateFilter[]).map((value) => (
            <option key={value} value={value}>
              {TEXT.date[value]}
            </option>
          ))}
        </Select>
      </div>
    </section>
  )
}
