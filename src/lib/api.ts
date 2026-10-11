const BASE = import.meta.env.VITE_API_BASE || 'https://admin-b2c.techbody.pt'

export async function apiPost(path: string, body: unknown) {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  })
  return r
}
export async function apiGet(path: string) {
  const token = localStorage.getItem('tb_token')
  const r = await fetch(`${BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    credentials: 'include',
  })
  if (!r.ok) throw new Error(`${r.status}`)
  return r.json()
}
export function setSecureToken(token: string) {
  localStorage.setItem('tb_token', token)
  try {
    document.cookie = `tb_token=${encodeURIComponent(token)}; Path=/; SameSite=Lax; Secure; Max-Age=86400`
  } catch {}
}
export function clearSecureToken() {
  localStorage.removeItem('tb_token')
  localStorage.removeItem('tb_user')
  try { document.cookie = 'tb_token=; Path=/; Max-Age=0' } catch {}
}
import { useEffect, useState } from 'react'
export function useApi<T>(path: string, fallback: T) {
  const [data, setData] = useState<T>(fallback)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    let alive = true
    setLoading(true)
    apiGet(path).then((j: T) => { if (alive) { setData(j); setError(null) } }).catch((e: Error) => { if (alive) setError(e.message) }).finally(()=> { if(alive) setLoading(false) })
    return () => { alive = false }
  }, [path])
  return { data, loading, error, setData }
}
