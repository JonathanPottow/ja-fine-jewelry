import styles from './page.module.css'

const icons: Record<string, JSX.Element> = {
  Discovery: (
    <>
      <path d="M12 8h24a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5H24l-9 8v-8h-3a5 5 0 0 1-5-5V13a5 5 0 0 1 5-5z" />
      <path d="M20 15h8l3 4-7 8-7-8z" />
    </>
  ),
  Design: (
    <>
      <path d="M8 40l2-9L31 10l7 7-21 21z" />
      <path d="M27 14l7 7" />
      <path d="M10 31l7 7" />
      <path d="M39 5v6M36 8h6" />
    </>
  ),
  Creation: (
    <>
      <circle cx="24" cy="31" r="10" />
      <path d="M18 14l3-5h6l3 5-6 8z" />
      <path d="M18 14h12" />
    </>
  ),
  Delivery: (
    <>
      <rect x="7" y="19" width="34" height="8" rx="1" />
      <path d="M10 27v14h28V27" />
      <path d="M24 19v22" />
      <path d="M24 19c-7-9-14-1-8 1M24 19c7-9 14-1 8 1" />
    </>
  ),
}

export default function ProcessIcon({ name }: { name: string }) {
  return (
    <span className={styles.processBadge} aria-hidden="true">
      <svg viewBox="0 0 48 48">{icons[name]}</svg>
    </span>
  )
}
