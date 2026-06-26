'use client'
import { useEffect, useState } from 'react'
import EmailGate from './EmailGate'

const STORAGE_KEY = 'tl_exit_intent_shown'

export default function ExitIntent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return
    if (window.innerWidth <= 768) return // skip on mobile (no mouseleave)

    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 10) return
      sessionStorage.setItem(STORAGE_KEY, '1')
      setShow(true)
      document.removeEventListener('mouseleave', onLeave)
    }

    // arm after 5s so we don't fire on initial page load mouse trajectory
    const t = setTimeout(() => document.addEventListener('mouseleave', onLeave), 5000)
    return () => {
      clearTimeout(t)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  if (!show) return null
  return <EmailGate onSuccess={() => setShow(false)} onClose={() => setShow(false)} />
}
