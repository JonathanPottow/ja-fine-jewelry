'use client'
import { INQUIRY_TOPICS } from '@/lib/inquiryTopics'
import styles from './TopicPicker.module.css'

// "What can I help with?" choice on the inquiry forms. Optional: tapping the
// selected topic again clears it.
export default function TopicPicker({ value, onChange }: { value: string; onChange: (key: string) => void }) {
  return (
    <fieldset className={styles.picker}>
      <legend className={styles.legend}>What can Jonathan help with?</legend>
      <div className={styles.options}>
        {INQUIRY_TOPICS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`${styles.option} ${value === t.key ? styles.selected : ''}`}
            aria-pressed={value === t.key}
            onClick={() => onChange(value === t.key ? '' : t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
