'use client'
import { useState } from 'react'
import styles from './page.module.css'

const PIECE_TYPES = [
  { label: 'Engagement Ring', icon: '◇', placeholder: "Tell Jonathan about your partner, your love story, and the vision you have for the ring." },
  { label: 'Wedding Band', icon: '○', placeholder: "Describe the look you are going for — classic, modern, diamond-set, plain?" },
  { label: 'Anniversary Piece', icon: '✦', placeholder: "What milestone are you celebrating? Tell Jonathan about the person." },
  { label: 'Pendant', icon: '◈', placeholder: "What is the inspiration for this pendant? A symbol, a stone, a memory?" },
  { label: 'Heirloom Redesign', icon: '❧', placeholder: "Tell Jonathan about the piece you would like reimagined and its history." },
  { label: 'Something Else', icon: '◦', placeholder: "Describe what you have in mind — Jonathan loves a unique challenge." },
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', piece: '', story: '', timeline: '' })
  const [files, setFiles] = useState<File[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

  const selectedPiece = PIECE_TYPES.find(p => p.label === form.piece)
  const storyPlaceholder = selectedPiece?.placeholder || "Tell Jonathan about your vision..."

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return
    const valid = Array.from(incoming).filter(f => f.type.startsWith('image/') || f.type === 'application/pdf')
    setFiles(prev => [...prev, ...valid].slice(0, 5))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const formData = new FormData()
      formData.append('data', JSON.stringify(form))
      files.forEach(f => formData.append('files', f))
      const res = await fetch('/api/contact', { method: 'POST', body: formData })
      if (res.ok) { setStatus('sent') } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  if (status === 'sent') return (
    <div className={styles.formSuccess}>
      <p className={styles.eyebrow}>Message received</p>
      <h3 className={styles.formSuccessTitle}>Thank you, {form.name.split(' ')[0]}.</h3>
      <p className={styles.formSuccessText}>Jonathan will be in touch personally within 48 hours.</p>
    </div>
  )

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>What can Jonathan create for you?</label>
        <div className={styles.pieceGrid}>
          {PIECE_TYPES.map((p) => (
            <button key={p.label} type="button"
              className={form.piece === p.label ? `${styles.pieceBtn} ${styles.pieceBtnActive}` : styles.pieceBtn}
              onClick={() => setForm({ ...form, piece: p.label })}>
              <span className={styles.pieceIcon}>{p.icon}</span>
              <span className={styles.pieceLabel}>{p.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className={form.piece ? styles.formFields : styles.formFieldsHidden}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}><label>Your Name</label><input type="text" required placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
          <div className={styles.formGroup}><label>Email</label><input type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
        </div>
        <div className={styles.formGroup}><label>Phone Number</label><input type="tel" required placeholder="Your number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
        <div className={styles.formGroup}><label>Your Story</label><textarea rows={5} placeholder={storyPlaceholder} value={form.story} onChange={e => setForm({...form, story: e.target.value})} /></div>
        <div className={styles.formGroup}>
          <label>Inspiration Images (optional)</label>
          <div className={dragOver ? `${styles.uploadZone} ${styles.uploadZoneActive}` : styles.uploadZone}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
            onClick={() => document.getElementById('fileInput')?.click()}>
            <input id="fileInput" type="file" multiple accept="image/*,.pdf" className={styles.fileInputHidden} onChange={e => handleFiles(e.target.files)} />
            <span className={styles.uploadIcon}>↑</span>
            <span className={styles.uploadText}>{files.length === 0 ? 'Tap to upload or drag images here' : `${files.length} file${files.length > 1 ? 's' : ''} selected`}</span>
            <span className={styles.uploadHint}>JPG, PNG, PDF up to 5 files</span>
          </div>
          {files.length > 0 && <div className={styles.fileList}>{files.map((f, i) => (<div key={i} className={styles.fileItem}><span className={styles.fileName}>{f.name}</span><button type="button" className={styles.fileRemove} onClick={() => setFiles(prev => prev.filter((_,j) => j !== i))}>×</button></div>))}</div>}
        </div>
        <div className={styles.formGroup}><label>Timeline</label><select value={form.timeline} onChange={e => setForm({...form, timeline: e.target.value})}><option value="">When do you need it?</option><option>Within 1 month</option><option>1-3 months</option><option>3-6 months</option><option>6+ months / no rush</option></select></div>
        {status === 'error' && <p className={styles.formError}>Something went wrong. Please try again.</p>}
        <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send My Inquiry'}</button>
      </div>
    </form>
  )
}
