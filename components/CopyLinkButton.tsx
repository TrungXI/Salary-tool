'use client'
export default function CopyLinkButton({ url }: { url: string }) {
  return (
    <button
      onClick={async () => {
        try { await navigator.clipboard.writeText(url) } catch {}
      }}
      style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
    >
      Copy link
    </button>
  )
}
