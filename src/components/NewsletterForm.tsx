'use client'

import {useState} from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <p className="gr-kicker" style={{margin: '0 0 16px', color: 'rgba(32,30,29,0.55)'}}>
        The newsletter
      </p>
      {status === 'done' ? (
        <p style={{fontSize: 13.5, lineHeight: '24px', color: 'var(--ink-65)', margin: 0}}>
          You are on the list. The list is calm.
        </p>
      ) : (
        <form onSubmit={onSubmit} style={{display: 'flex', maxWidth: 340}}>
          <label htmlFor="newsletter-email" className="sr-only" style={{position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)'}}>
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            style={{
              flex: 1,
              minWidth: 0,
              padding: '13px 14px',
              fontSize: 13.5,
              fontFamily: 'inherit',
              border: '1px solid rgba(32,30,29,0.22)',
              borderRight: 0,
              background: '#fff',
              color: '#201e1d',
            }}
          />
          <button
            type="submit"
            className="gr-btn"
            disabled={status === 'sending'}
            style={{padding: '13px 18px', background: '#201e1d', color: '#fff', border: 0}}
          >
            Join
          </button>
        </form>
      )}
      {status === 'error' && (
        <p style={{fontSize: 12.5, color: '#ec3013', margin: '10px 0 0'}}>
          That did not work. Try once more.
        </p>
      )}
    </div>
  )
}
