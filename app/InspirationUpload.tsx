'use client'
import { useEffect, useMemo, useRef, useState } from 'react'

// Lets a visitor attach up to 3 inspiration images.
// Photos are shrunk in the browser (max 1600px, JPEG) so they upload fast
// and stay well under the website's upload size limit.
const MAX_FILES = 3
const MAX_DIM = 1600

async function shrink(file: File): Promise<File> {
  if (!file.type.startsWith('image/') && !/\.(heic|heif)$/i.test(file.name)) {
    throw new Error('not an image')
  }
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_DIM / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const blob: Blob = await new Promise((resolve, reject) =>
      canvas.toBlob(b => (b ? resolve(b) : reject(new Error('encode failed'))), 'image/jpeg', 0.82)
    )
    const base = file.name.replace(/\.[^.]+$/, '') || 'inspiration'
    return new File([blob], `${base}.jpg`, { type: 'image/jpeg' })
  } catch {
    // Browser couldn't read it (e.g. some HEIC files) — send as-is if it's small enough
    if (file.size <= 1.2 * 1024 * 1024) return file
    throw new Error('too large')
  }
}

export default function InspirationUpload({ files, onChange }: { files: File[]; onChange: (f: File[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState('')

  const previews = useMemo(() => files.map(f => URL.createObjectURL(f)), [files])
  useEffect(() => () => previews.forEach(u => URL.revokeObjectURL(u)), [previews])

  const addFiles = async (list: FileList | null) => {
    if (!list || !list.length) return
    setBusy(true)
    setNote('')
    const next = [...files]
    for (const f of Array.from(list)) {
      if (next.length >= MAX_FILES) { setNote(`You can share up to ${MAX_FILES} images.`); break }
      try { next.push(await shrink(f)) } catch { setNote('One image couldn’t be added — please try a JPG or PNG.') }
    }
    onChange(next)
    setBusy(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  const remove = (i: number) => onChange(files.filter((_, idx) => idx !== i))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
        {previews.map((src, i) => (
          <div key={src} style={{ position: 'relative', width: 72, height: 72 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`Inspiration ${i + 1}`} style={{ width: 72, height: 72, objectFit: 'cover', border: '0.5px solid var(--tan)' }} />
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Remove image"
              style={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: '50%', border: 'none', background: 'var(--espresso)', color: 'var(--cream)', fontSize: 13, lineHeight: '22px', cursor: 'pointer', padding: 0 }}
            >×</button>
          </div>
        ))}
        {files.length < MAX_FILES && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            style={{ background: 'transparent', border: '0.5px solid var(--tan)', color: 'var(--espresso)', padding: '0.7rem 1.25rem', fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: busy ? 'wait' : 'pointer' }}
          >
            {busy ? 'Adding…' : files.length ? '+ Add another' : '+ Add images'}
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={e => addFiles(e.target.files)}
      />
      {note && <p style={{ fontSize: 12, color: '#a03020', margin: 0 }}>{note}</p>}
    </div>
  )
}
