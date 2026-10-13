import { useState, useMemo, useEffect } from 'react'
import { Search, Filter, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { listProfiles, type Profile } from '../lib/adminDb'

export default function AppRegistrations() {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState<Profile[]>([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const pageSize = 10

  const load = () => {
    setLoading(true)
    listProfiles().then(list => { setRows(list.filter(p => p.source === 'app')); setErr(null) })
      .catch((e: Error) => setErr(e.message))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])
  useEffect(() => { setPage(1) }, [q])

  const filtered = useMemo(() => {
    if (!q.trim()) return rows
    const s = q.toLowerCase()
    return rows.filter(r => `${r.name} ${r.email} ${r.phone}`.toLowerCase().includes(s))
  }, [rows, q])
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)
  const fmt = (iso: string) => new Date(iso).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date(iso).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">App Registrations</h1>
          <p className="text-gray-600 mt-1">Contas criadas na app TechBody U</p>
        </div>
        <button onClick={load} className="h-9 px-4 rounded-md border bg-white text-sm font-medium">Refresh Data</button>
      </div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin" /> Loading registrations...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16} /> {err}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-6"><p className="text-sm font-medium">Total Registrations</p><p className="text-2xl font-bold mt-2">{rows.length}</p></div>
        <div className="bg-white rounded-lg border p-6"><p className="text-sm font-medium">Últimos 7 dias</p><p className="text-2xl font-bold mt-2">{rows.filter(r => Date.now() - new Date(r.created_at).getTime() <= 7 * 864e5).length}</p></div>
        <div className="bg-white rounded-lg border p-6"><p className="text-sm font-medium">Ativos</p><p className="text-2xl font-bold mt-2">{rows.filter(r => r.status === 'Active').length}</p></div>
      </div>
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 flex items-center justify-between bg-blue-50/50 border-b">
          <h3 className="font-semibold">Registos da App</h3>
          <div className="flex gap-2">
            <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or email" className="h-9 pl-9 pr-3 w-72 rounded-md border bg-white text-sm" /></div>
            <button className="h-9 w-9 grid place-items-center rounded-md border bg-white"><Filter size={16} /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-xs text-gray-500 border-b"><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Nome</th><th className="px-4 py-3 text-left">Email</th><th className="px-4 py-3 text-left">Phone</th><th className="px-4 py-3 text-left">Origem</th><th className="px-4 py-3 text-left">Criado</th></tr></thead>
            <tbody>
              {paged.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{r.status === 'Active' ? <CheckCircle2 size={16} className="text-green-500" /> : <span className="text-red-500 text-xs font-semibold">{r.status}</span>}</td>
                  <td className="px-4 py-3 font-medium max-w-[160px] truncate">{r.name || '—'}</td>
                  <td className="px-4 py-3 max-w-[200px] truncate">{r.email}</td>
                  <td className="px-4 py-3">{r.phone || '-'}</td>
                  <td className="px-4 py-3"><span className="text-xs font-medium rounded-full border px-2 py-0.5 bg-gray-50">{r.source}</span></td>
                  <td className="px-4 py-3 whitespace-nowrap">{fmt(r.created_at)}</td>
                </tr>
              ))}
              {paged.length === 0 && <tr><td colSpan={6} className="py-10 text-center text-gray-500">Sem registos da app ainda — quando alguém criar conta aparece aqui.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 text-sm border-t">
          <span className="text-gray-600">Showing {paged.length ? (page - 1) * pageSize + 1 : 0} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} registrations</span>
          <div className="flex items-center gap-2"><button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="h-8 px-3 rounded-md border disabled:opacity-40">Previous</button><span>Page {page} of {totalPages}</span><button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="h-8 px-3 rounded-md border disabled:opacity-40">Next</button></div>
        </div>
      </div>
    </div>
  )
}
