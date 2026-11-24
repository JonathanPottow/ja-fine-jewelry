'use client'
import { MEETING_OPTIONS } from '@/lib/inquiryTopics'
import styles from './MeetingPicker.module.css'

// "How would you like to begin?" on the inquiry forms: meet in Charlotte, video
// consultation, or a message. Meetings also ask for preferred days and times.
export default function MeetingPicker({
  value,
  onChange,
  availability,
  onAvailability,
}: {
  value: string
  onChange: (key: string) => void
  availability: string
  onAvailability: (v: string) => void
}) {
  const wantsMeeting = value === 'charlotte' || value === 'video'
  return (
    <fieldset className={styles.picker}>
      <legend className={styles.legend}>How would you like to begin?</legend>
      <div className={styles.options}>
        {MEETING_OPTIONS.map((m) => (
          <button
            key={m.key}
            type="button"
            className={`${styles.option} ${value === m.key ? styles.selected : ''}`}
            aria-pressed={value === m.key}
            onClick={() => onChange(value === m.key ? '' : m.key)}
          >
            <span className={styles.label}>{m.label}</span>
            <span className={styles.note}>{m.note}</span>
          </button>
        ))}
      </div>
      {wantsMeeting && (
        <label className={styles.when}>
          Preferred days &amp; times <span className={styles.optional}>(optional)</span>
          <input
            type="text"
            maxLength={200}
            placeholder="e.g. weekday evenings, or Saturday morning"
            value={availability}
            onChange={(e) => onAvailability(e.target.value)}
          />
        </label>
      )}
    </fieldset>
  )
}
