const BASE = import.meta.env.VITE_API_BASE || 'https://admin-b2c.techbody.pt'

export async function apiPost(path: string, body: unknown) {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return r
}
export async function apiGet(path: string) {
  const token = localStorage.getItem('tb_token')
  const r = await fetch(`${BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!r.ok) throw new Error(`${r.status}`)
  return r.json()
}
