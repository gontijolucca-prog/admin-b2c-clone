import { useState, useMemo, useEffect } from 'react'
import { Search, Filter, Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'

const fallbackUsers = [
  { id: 'CA', name: 'carlasousa3801', full: 'Carla sousa', email: 'carla.sousa@me.com', sub: '-', role: 'User', ems: '-', status: 'Active', avatar: '' },
  { id: 'VA', name: 'vaniacfernandes19782502', full: 'Vânia Carina Fernandes Tinoco', email: 'vaniacfernandes1978@gmail.com', sub: '-', role: 'User', ems: '-', status: 'Active', avatar: '' },
  { id: 'AL', name: 'alexandrefsoares7336', full: 'alexandre soares', email: 'alexandrefsoares@gmail.com', sub: '-', role: 'User', ems: '-', status: 'Active', avatar: '' },
  { id: 'GE', name: 'geral7554', full: 'Marta Lourenço Unipessoal Lda', email: 'geral@rebootbodystudio.pt', sub: '-', role: 'User', ems: 'EMS-GG2026P02T060', status: 'Active', avatar: '', highlight: true },
  { id: 'AN', name: 'anavitoriasantiago2561696', full: 'Ana', email: 'anavitoriasantiago256@gmail.com', sub: '-', role: 'User', ems: 'EMS-GG2026P02T010', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=5' },
  { id: 'AN2', name: 'anampereira72678154', full: 'Ana Pereira', email: 'anampereira7267@gmail.com', sub: '-', role: 'User', ems: 'EMS-GG2026P02T041', status: 'Active', avatar: '' },
  { id: 'CA2', name: 'Carlos Silva', full: 'Carlos Silva', email: 'cmsilva246@gmail.com', sub: '-', role: 'User', ems: 'EMS-GG2026P02T111', status: 'Active', avatar: '' },
  { id: 'DA', name: 'David', full: 'David', email: 'david.c.invest@gmail.com', sub: '-', role: 'User', ems: 'EMS-GG2026P02T001', status: 'Active', avatar: '' },
  { id: 'LE', name: 'Leticia Rodrigues', full: 'Leticia Rodrigues', email: 'lboahora@yahoo.com', sub: '-', role: 'User', ems: 'EMS-GG2026P02T119', status: 'Active', avatar: '' },
  { id: 'LU', name: 'Luis Gomes', full: 'Luis Gomes', email: 'luismiguel.m.gomes@gmail.com', sub: '-', role: 'User', ems: 'EMS-GG2026P02T119', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=12' },
]

export default function Users() {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState(fallbackUsers)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const pageSize = 10

  useEffect(() => {
    let alive = true
    setLoading(true)
    apiGet('/api/users').then((j: any) => {
      if (!alive) return
      const list = Array.isArray(j) ? j : j.users || j.data || []
      if (Array.isArray(list) && list.length > 0) {
        const mapped = list.map((u: any, i: number) => ({
          id: (u.id || u._id || String(i)).slice(0,2).toUpperCase(),
          name: u.username || u.name || `user${i}`,
          full: u.fullName || u.name || u.email || '',
          email: u.email || '',
          sub: u.subscription || '-',
          role: u.role || 'User',
          ems: u.emsDevice || u.device || '-',
          status: u.status || 'Active',
          avatar: u.avatar || '',
          highlight: false,
        }))
        setUsers(mapped)
      }
      setErr(null)
    }).catch((e: Error) => { if(alive) setErr(e.message) }).finally(()=> { if(alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  const filtered = useMemo(() => {
    if (!q.trim()) return users
    const s = q.toLowerCase()
    return users.filter(u => `${u.full} ${u.email} ${u.name} ${u.ems}`.toLowerCase().includes(s))
  }, [users, q])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged = filtered.slice((page-1)*pageSize, page*pageSize)

  useEffect(()=>{ setPage(1) }, [q])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Users</h1>
          <p className="text-gray-600 mt-1">Manage users, their EMS devices, and fitness progress</p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5v14"/></svg>
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold">All Users ({filtered.length})</h2>
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search users..." className="h-9 pl-9 pr-3 w-64 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <button className="h-9 w-9 grid place-items-center rounded-md border border-input hover:bg-accent">
                <Filter size={16} />
              </button>
            </div>
          </div>

          {loading && <div className="flex items-center gap-2 text-sm text-gray-500 py-4"><Loader2 size={16} className="animate-spin"/> Loading users from API...</div>}
          {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 mb-4"><AlertCircle size={16}/> API unavailable — showing cached data ({err})</div>}

          <div className="sm:hidden mb-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search users..." className="h-9 pl-9 pr-3 w-full rounded-md border border-input bg-background text-sm"/>
            </div>
          </div>

          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">User</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">Name</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">E-mail</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">Subscription</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">Role</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">EMS Device</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {paged.map(u => (
                  <tr key={u.name} className={`border-b last:border-0 hover:bg-gray-50 ${u.highlight ? 'bg-gray-50/70' : ''}`}>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center gap-2">
                        {u.avatar ? <img src={u.avatar} className="w-8 h-8 rounded-full object-cover" /> : <span className="w-8 h-8 rounded-full bg-[#fff4e6] text-[#e68a00] grid place-items-center text-xs font-semibold">{u.id.slice(0,2)}</span>}
                        <span className="text-sm font-medium truncate max-w-[110px]">{u.name}</span>
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm max-w-[160px] truncate">{u.full}</td>
                    <td className="py-3 px-2 text-sm text-gray-600 max-w-[180px] truncate">{u.email}</td>
                    <td className="py-3 px-2 text-sm text-gray-500">{u.sub}</td>
                    <td className="py-3 px-2"><span className="inline-flex text-xs font-medium rounded-full border px-2 py-0.5 bg-gray-50">{u.role}</span></td>
                    <td className="py-3 px-2 text-sm">{u.ems}</td>
                    <td className="py-3 px-2"><span className="inline-flex items-center text-xs font-medium rounded-full bg-[#fff4e6] text-[#b45309] border border-orange-200 px-2.5 py-1"><span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mr-1.5"/> {u.status}</span></td>
                  </tr>
                ))}
                {paged.length===0 && <tr><td colSpan={7} className="py-12 text-center text-sm text-gray-500">No users found for "{q}"</td></tr>}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-4 mt-2 border-t text-sm">
            <span className="text-gray-600">Showing {paged.length ? (page-1)*pageSize+1 : 0} to {Math.min(page*pageSize, filtered.length)} of {filtered.length}</span>
            <div className="flex items-center gap-2">
              <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="h-8 px-3 rounded-md border text-sm disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
              <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
              <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)} className="h-8 px-3 rounded-md border text-sm disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
