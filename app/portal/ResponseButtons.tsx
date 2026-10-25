'use client'
import { useState } from 'react'
import styles from './portal.module.css'

export default function ResponseButtons({ dealId, stage }: { dealId: string; stage: 'design' | 'quote' }) {
  const [mode, setMode] = useState<'none' | 'changes'>('none')
  const [note, setNote] = useState('')
  const [done, setDone] = useState('')
  const [failed, setFailed] = useState(false)
  const [busy, setBusy] = useState(false)

  async function send(action: 'approve' | 'changes') {
    setBusy(true)
    setFailed(false)
    const r = await fetch('/api/portal/respond', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dealId, action, note }) }).catch(() => null)
    setBusy(false)
    if (!r?.ok) return setFailed(true)
    setDone(action === 'approve' ? 'Thank you. Jonathan has been notified and will confirm next steps with you.' : 'Thank you. Jonathan has your notes and will be in touch.')
  }

  return (
    <div className={styles.review}>
      {done ? (
        <div className={styles.thanks} role="status">
          <span className={styles.seal} aria-hidden>
            <svg viewBox="0 0 56 56" width="56" height="56"><circle cx="28" cy="28" r="25" /><path d="M18 29l7 7 13-15" /></svg>
            <span className={styles.spark} /><span className={styles.spark} /><span className={styles.spark} />
          </span>
          <p>{done}</p>
        </div>
      ) : (<>
        <span className={styles.label}>Your review</span>
        <h3 className={styles.reviewTitle}>{stage === 'design' ? 'How does the design feel?' : 'Ready to go ahead?'}</h3>
        <p className={styles.reviewText}>
          {stage === 'design'
            ? 'Take your time with it. If anything should change, even something small, just say so.'
            : 'Approve when you are happy, or tell Jonathan what you would like to adjust.'}
        </p>
        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.btnGold}`} disabled={busy} onClick={() => send('approve')}>{busy && mode === 'none' ? 'Sending…' : stage === 'design' ? 'I love it, approve' : 'Approve quote'}</button>
          {mode === 'none' && <button className={`${styles.btn} ${styles.btnLine}`} disabled={busy} onClick={() => setMode('changes')}>Request changes</button>}
        </div>
        {mode === 'changes' && (
          <div>
            <textarea className={styles.textarea} autoFocus placeholder="What would you like adjusted?" value={note} onChange={(e) => setNote(e.target.value)} />
            <div className={styles.actions}>
              <button className={`${styles.btn} ${styles.btnLine}`} disabled={busy || !note.trim()} onClick={() => send('changes')}>{busy ? 'Sending…' : 'Send to Jonathan'}</button>
              <button className={styles.signOut} style={{ color: 'rgba(245,240,232,.6)' }} onClick={() => { setMode('none'); setNote('') }}>Cancel</button>
            </div>
          </div>
        )}
        {failed && <p className={styles.error}>Something went wrong. Please text or email Jonathan directly.</p>}
      </>)}
    </div>
  )
}
