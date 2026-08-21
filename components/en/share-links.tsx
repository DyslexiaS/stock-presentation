'use client'

import { Check, Link2, Linkedin, Share2 } from 'lucide-react'
import { useState } from 'react'

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.726-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function ShareLinks({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false)

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  async function share() {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url })
        return
      } catch (error) {
        if ((error as Error).name === 'AbortError') return
      }
    }
    await copyUrl()
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`

  const iconBtn =
    'inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:border-slate-900 hover:text-slate-900'

  return (
    <div className="flex shrink-0 items-center gap-2" aria-label="Share this page">
      <button type="button" onClick={share} className={iconBtn} aria-label="Share">
        <Share2 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={copyUrl}
        className={iconBtn}
        aria-label={copied ? 'Link copied' : 'Copy link'}
      >
        {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Link2 className="h-4 w-4" />}
      </button>
      <a href={twitterHref} target="_blank" rel="noopener noreferrer" className={iconBtn} aria-label="Share on X">
        <XLogo className="h-3.5 w-3.5" />
      </a>
      <a href={linkedinHref} target="_blank" rel="noopener noreferrer" className={iconBtn} aria-label="Share on LinkedIn">
        <Linkedin className="h-4 w-4" />
      </a>
    </div>
  )
}
