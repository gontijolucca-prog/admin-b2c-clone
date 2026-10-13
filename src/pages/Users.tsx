import { useState, useMemo, useEffect } from 'react'
import { Search, Loader2, AlertCircle, Ban, CheckCircle2, KeyRound } from 'lucide-react'
import { listProfiles, updateProfile, resetPassword, type Profile } from '../lib/adminDb'

export default function Users() {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const pageSize = 10

  const load = () => {
    setLoading(true)
    listProfiles().then(list => { setUsers(list); setErr(null) })
      .catch((e: Error) => setErr(e.message))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])
  useEffect(() => { setPage(1) }, [q])

  const filtered = useMemo(() => {
    if (!q.trim()) return users
    const s = q.toLowerCase()
    return users.filter(u => `${u.name} ${u.email} ${u.role} ${u.source}`.toLowerCase().includes(s))
  }, [users, q])
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  const flash = (m: string) => { setNote(m); setTimeout(() => setNote(null), 3000) }
  const toggleBlock = async (u: Profile) => {
    try { await updateProfile(u.id, { status: u.status === 'Blocked' ? 'Active' : 'Blocked' }); flash(u.status === 'Blocked' ? 'Utilizador ativado' : 'Utilizador bloqueado'); load() }
    catch (e: any) { flash('Erro: ' + e.message) }
  }
  const setRole = async (u: Profile, role: string) => {
    try { await updateProfile(u.id, { role }); flash('Função atualizada para ' + role); load() }
    catch (e: any) { flash('Erro: ' + e.message) }
  }
  const sendReset = async (u: Profile) => {
    if (!u.email) return
    try { await resetPassword(u.email); flash('Email de reset enviado para ' + u.email) }
    catch (e: any) { flash('Erro: ' + e.message) }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Users</h1>
          <p className="text-gray-600 mt-1">Gerir contas, funções e acessos — reflete na app na hora</p>
        </div>
      </div>

      {note && <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">{note}</div>}

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold">All Users ({filtered.length})</h2>
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search users..." className="h-9 pl-9 pr-3 w-64 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          {loading && <div className="flex items-center gap-2 text-sm text-gray-500 py-4"><Loader2 size={16} className="animate-spin" /> Loading users...</div>}
          {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 mb-4"><AlertCircle size={16} /> {err}</div>}

          <div className="sm:hidden mb-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search users..." className="h-9 pl-9 pr-3 w-full rounded-md border border-input bg-background text-sm" />
            </div>
          </div>

          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">User</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">E-mail</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">Subscription</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">Role</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">Points</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">Status</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map(u => (
                  <tr key={u.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#fff4e6] text-[#e68a00] grid place-items-center text-xs font-semibold">{(u.name || u.email || '?').slice(0, 2).toUpperCase()}</span>
                        <span className="text-sm font-medium truncate max-w-[150px]">{u.name || '—'}</span>
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 max-w-[200px] truncate">{u.email}</td>
                    <td className="py-3 px-2 text-sm text-gray-500">{u.subscription_tier || 'None'}</td>
                    <td className="py-3 px-2">
                      <select value={u.role} onChange={e => setRole(u, e.target.value)} className="text-xs font-medium rounded-full border px-2 py-1 bg-gray-50">
                        <option value="client">client</option>
                        <option value="trainer">trainer</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="py-3 px-2 text-sm">{u.total_points}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center text-xs font-medium rounded-full px-2.5 py-1 border ${u.status === 'Blocked' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-[#fff4e6] text-[#b45309] border-orange-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${u.status === 'Blocked' ? 'bg-red-500' : 'bg-[#f59e0b]'}`} /> {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="flex gap-2">
                        <button onClick={() => toggleBlock(u)} title={u.status === 'Blocked' ? 'Ativar' : 'Bloquear'} className="w-8 h-8 grid place-items-center rounded-md border hover:bg-gray-50">
                          {u.status === 'Blocked' ? <CheckCircle2 size={14} className="text-green-600" /> : <Ban size={14} className="text-red-500" />}
                        </button>
                        <button onClick={() => sendReset(u)} title="Enviar email de reset de password" className="w-8 h-8 grid place-items-center rounded-md border hover:bg-gray-50">
                          <KeyRound size={14} className="text-gray-600" />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
                {paged.length === 0 && <tr><td colSpan={7} className="py-12 text-center text-sm text-gray-500">No users found for "{q}"</td></tr>}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-4 mt-2 border-t text-sm">
            <span className="text-gray-600">Showing {paged.length ? (page - 1) * pageSize + 1 : 0} to {Math.min(page * pageSize, filtered.length)} of {filtered.length}</span>
            <div className="flex items-center gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="h-8 px-3 rounded-md border text-sm disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
              <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="h-8 px-3 rounded-md border text-sm disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
