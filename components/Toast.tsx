'use client'

export default function Toast({ message }: { message: string }) {
  if (!message) return null
  return (
    <div style={{
      position: 'fixed',
      bottom: 28,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--text)',
      color: 'white',
      padding: '10px 18px',
      borderRadius: 10,
      fontSize: 14,
      zIndex: 1100,
      whiteSpace: 'nowrap',
    }}>
      {message}
    </div>
  )
}
