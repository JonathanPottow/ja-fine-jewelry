'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { upload } from '@vercel/blob/client'
import type { StudioDeal } from '@/lib/portal/hubspot'
import styles from './studio.module.css'

type Stage = { id: string; label: string; clientSees: string }
type Upload = { key: string; name: string; pct: number; failed?: boolean }

const isHttps = (s: string) => /^https:\/\/[^\s]+$/.test(s)

export default function StudioEditor({ deal, stages }: { deal: StudioDeal; stages: Stage[] }) {
  const router = useRouter()
  const initial = { stageId: deal.stageId, message: deal.message, nextStep: deal.nextStep, quoteUrl: deal.quoteUrl, images: deal.cadUrls }
  const [saved, setSaved] = useState(initial)
  const [stageId, setStageId] = useState(initial.stageId)
  const [message, setMessage] = useState(initial.message)
  const [nextStep, setNextStep] = useState(initial.nextStep)
  const [quoteUrl, setQuoteUrl] = useState(initial.quoteUrl)
  const [images, setImages] = useState<string[]>(initial.images)
  const [uploads, setUploads] = useState<Upload[]>([])
  const [link, setLink] = useState('')
  const [dragging, setDragging] = useState(false)
  const [notify, setNotify] = useState(!!deal.client?.email)
  const [status, setStatus] = useState<{ kind: 'idle' | 'saving' | 'done' | 'error'; text?: string }>({ kind: 'idle' })
  const fileInput = useRef<HTMLInputElement>(null)

  const first = deal.client?.firstName || 'the client'
  const current = { stageId, message, nextStep, quoteUrl, images }
  const dirty = JSON.stringify(current) !== JSON.stringify(saved)
  const uploading = uploads.some((u) => !u.failed)
  const stage = stages.find((s) => s.id === stageId)

  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  async function addFiles(files: FileList | File[]) {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'))
    await Promise.all(list.map(async (file) => {
      const key = `${file.name}-${file.size}-${Math.random()}`
      setUploads((u) => [...u, { key, name: file.name, pct: 0 }])
      try {
        const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-')
        const blob = await upload(`cad/${deal.id}/${safe}`, file, {
          access: 'public',
          handleUploadUrl: '/api/portal/studio/upload',
          clientPayload: deal.id,
          multipart: file.size > 8 * 1024 * 1024,
          onUploadProgress: ({ percentage }) => setUploads((u) => u.map((x) => (x.key === key ? { ...x, pct: percentage } : x))),
        })
        setImages((imgs) => [...imgs, blob.url])
        setUploads((u) => u.filter((x) => x.key !== key))
      } catch (e) {
        console.error(e)
        setUploads((u) => u.map((x) => (x.key === key ? { ...x, failed: true } : x)))
      }
    }))
  }

  function addLink() {
    const urls = link.split(/\s+/).filter(isHttps)
    if (urls.length) setImages((imgs) => [...imgs, ...urls.filter((u) => !imgs.includes(u))])
    setLink('')
  }

  const makeMain = (i: number) => setImages((imgs) => [imgs[i], ...imgs.filter((_, j) => j !== i)])
  const remove = (i: number) => setImages((imgs) => imgs.filter((_, j) => j !== i))

  async function save() {
    setStatus({ kind: 'saving' })
    const r = await fetch('/api/portal/studio/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dealId: deal.id, stageId, message, nextStep, quoteUrl, cadUrls: images, notify: notify && !!deal.client?.email }),
    }).catch(() => null)
    const j = r ? await r.json().catch(() => ({})) : {}
    if (!r?.ok) return setStatus({ kind: 'error', text: j.error || 'Could not save to HubSpot. Nothing was changed. Please try again.' })
    setSaved(current)
    setStatus({ kind: 'done', text: j.emailed ? `Saved, and ${first} has been emailed.` : j.emailFailed ? `Saved to HubSpot, but the email to ${first} did not send.` : 'Saved. Their page is updated.' })
    router.refresh()
  }

  return (
    <div className={styles.editor}>
      <header className={styles.dealHead}>
        <span className={styles.eyebrow}>{deal.client ? `${deal.client.firstName} ${deal.client.lastName}`.trim() || deal.client.email : 'No contact on this deal'}</span>
        <h1 className={styles.title}>{deal.piece || deal.name}</h1>
        {deal.client?.email && <p className={styles.small}>{deal.client.email}</p>}
      </header>

      <section className={styles.panel}>
        <label className={styles.label} htmlFor="stage">Stage</label>
        <select id="stage" className={styles.input} value={stageId} onChange={(e) => setStageId(e.target.value)}>
          {!stage && <option value={stageId}>Current HubSpot stage</option>}
          {stages.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        {stage && <p className={styles.hint}>Client sees: {stage.clientSees}</p>}
      </section>

      <section className={styles.panel}>
        <span className={styles.label}>Designs</span>
        <div
          className={`${styles.drop} ${dragging ? styles.dropOn : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
          onClick={() => fileInput.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInput.current?.click() }}
        >
          <strong>Add renders</strong>
          <span>Drop files here, or tap to choose photos (JPG, PNG, WebP)</span>
          <input ref={fileInput} type="file" accept="image/*" multiple hidden onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = '' }} />
        </div>

        {uploads.length > 0 && (
          <ul className={styles.uploads}>
            {uploads.map((u) => (
              <li key={u.key}>
                <span>{u.name}</span>
                {u.failed
                  ? <button className={styles.quiet} onClick={() => setUploads((x) => x.filter((y) => y.key !== u.key))}>Upload failed. Dismiss</button>
                  : <span className={styles.bar}><span style={{ width: `${u.pct}%` }} /></span>}
              </li>
            ))}
          </ul>
        )}

        {images.length > 0 && (
          <ul className={styles.images}>
            {images.map((u, i) => (
              <li key={u} className={i === 0 ? styles.mainImage : undefined}>
                <img src={u} alt={`Design ${i + 1}`} />
                <div className={styles.imageActions}>
                  {i === 0 ? <span className={styles.small}>Main image</span> : <button className={styles.quiet} onClick={() => makeMain(i)}>Make main</button>}
                  <button className={styles.quiet} onClick={() => remove(i)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.linkRow}>
          <input className={styles.input} placeholder="Or paste an image link (https://…)" value={link} onChange={(e) => setLink(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addLink() } }} />
          <button className={styles.btnLine} onClick={addLink} disabled={!link.trim()}>Add</button>
        </div>
      </section>

      <section className={styles.panel}>
        <label className={styles.label} htmlFor="message">Note to {first}</label>
        <textarea id="message" className={styles.textarea} rows={4} maxLength={2000} placeholder="A few words about where things stand." value={message} onChange={(e) => setMessage(e.target.value)} />
        <label className={styles.label} htmlFor="next">What happens next</label>
        <textarea id="next" className={styles.textarea} rows={2} maxLength={1000} placeholder="e.g. Once you approve the design, I will send the final quote." value={nextStep} onChange={(e) => setNextStep(e.target.value)} />
        <label className={styles.label} htmlFor="quote">Quote link <span className={styles.optional}>optional</span></label>
        <input id="quote" className={styles.input} placeholder="https://…" value={quoteUrl} onChange={(e) => setQuoteUrl(e.target.value)} />
        {quoteUrl && !isHttps(quoteUrl.trim()) && <p className={styles.warn}>This needs to start with https:// to show on the client page.</p>}
      </section>

      <div className={styles.sendBar}>
        {deal.client?.email ? (
          <label className={styles.check}>
            <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} />
            Email {first} that there is an update
          </label>
        ) : <span className={styles.small}>No client email on this deal, so no email will be sent.</span>}
        <button className={styles.btn} disabled={status.kind === 'saving' || uploading || (!dirty && !notify)} onClick={save}>
          {status.kind === 'saving' ? 'Saving…' : uploading ? 'Uploading…' : notify && deal.client?.email ? `Save and email ${first}` : 'Save'}
        </button>
        {status.text && <p className={status.kind === 'error' ? styles.warn : styles.ok} role="status">{status.text}</p>}
      </div>
    </div>
  )
}
