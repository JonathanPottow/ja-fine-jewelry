'use client'
import { useState } from 'react'
import styles from './portal.module.css'

export default function ResponseButtons({ dealId }: { dealId: string }) {
  const [mode, setMode] = useState<'none' | 'changes'>('none')
  const [note, setNote] = useState('')
  const [done, setDone] = useState('')
  const [busy, setBusy] = useState(false)

  async function send(action: 'approve' | 'changes') {
    setBusy(true)
    const r = await fetch('/api/portal/respond', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dealId, action, note }) })
    setBusy(false)
    setDone(r.ok ? (action === 'approve' ? 'Thank you. Jonathan has been notified and will confirm next steps with you.' : 'Thank you. Jonathan has your notes and will be in touch.') : 'Something went wrong. Please text or email Jonathan directly.')
  }

  if (done) return <p className={styles.note}>{done}</p>
  return (
    <div>
      <div className={styles.actions}>
        <button className={styles.btn} disabled={busy} onClick={() => send('approve')}>Approve</button>
        <button className={`${styles.btn} ${styles.btnGhost}`} disabled={busy} onClick={() => setMode('changes')}>Request changes</button>
      </div>
      {mode === 'changes' && (
        <div>
          <textarea className={styles.textarea} placeholder="What would you like adjusted?" value={note} onChange={(e) => setNote(e.target.value)} />
          <button className={styles.btn} disabled={busy || !note.trim()} onClick={() => send('changes')}>Send to Jonathan</button>
        </div>
      )}
    </div>
  )
}
