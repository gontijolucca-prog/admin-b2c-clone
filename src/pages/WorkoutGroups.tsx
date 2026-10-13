import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Loader2, AlertCircle, Plus, Pencil, Trash2, Play } from 'lucide-react'
import { listGroups, saveGroup, deleteGroup, countGroupWorkouts, type Group } from '../lib/adminDb'

const empty: Partial<Group> = { name: '', description: '', order: 0, is_workout_plan: false }

export default function WorkoutGroups() {
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState<Group[]>([])
  const [counts, setCounts] = useState<Record<number, number>>({})
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [edit, setEdit] = useState<Partial<Group> | null>(null)
  const [saving, setSaving] = useState(false)
  const pageSize = 10

  const load = () => {
    setLoading(true)
    Promise.all([listGroups(), countGroupWorkouts()])
      .then(([g, c]) => { setRows(g); setCounts(c); setErr(null) })
      .catch((e: Error) => setErr(e.message))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])
  const flash = (m: string) => { setNote(m); setTimeout(() => setNote(null), 3000) }

  const save = async () => {
    if (!edit || !edit.name?.trim()) { flash('Nome obrigatório'); return }
    setSaving(true)
    try {
      const slug = edit.slug || edit.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      await saveGroup({ ...edit, slug })
      flash('Grupo guardado'); setEdit(null); load()
    } catch (e: any) { flash('Erro: ' + e.message) }
    finally { setSaving(false) }
  }
  const remove = async (g: Group) => {
    if (!confirm(`Apagar grupo "${g.name}"? Os treinos não são apagados.`)) return
    try { await deleteGroup(g.id); flash('Grupo apagado'); load() }
    catch (e: any) { flash('Erro: ' + e.message) }
  }

  const filtered = useMemo(() => q.trim() ? rows.filter(g => g.name.toLowerCase().includes(q.toLowerCase())) : rows, [rows, q])
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)
  useEffect(() => { setPage(1) }, [q])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workout Groups</h1>
          <p className="text-gray-600 mt-1">Categorias e coleções de treinos — o que mudares aqui aparece na app</p>
        </div>
        <button onClick={() => setEdit({ ...empty, order: rows.length + 1 })} className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-primary hover:bg-primary/90 text-white text-sm font-medium">
          <Plus size={16} /> Create New Group
        </button>
      </div>

      {note && <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">{note}</div>}

      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search groups..." className="h-10 pl-10 pr-3 w-full rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>

      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin" /> Loading groups...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16} /> {err}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {paged.map(g => (
          <div key={g.id} className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col hover:shadow-md transition">
            <div className="h-36 bg-gray-100 overflow-hidden">
              {g.thumbnail_url
                ? <img src={g.thumbnail_url} alt="" className="w-full h-full object-cover" />
                : <div className="w-full h-full grid place-items-center text-gray-300 text-sm">sem imagem</div>}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">{g.name}</h3>
                <span className="text-xs text-gray-500 shrink-0 flex items-center gap-1">{counts[g.id] ?? 0} vídeos</span>
              </div>
              {g.is_workout_plan && <span className="self-start mt-2 text-[10px] uppercase tracking-wide bg-purple-50 text-purple-600 border border-purple-200 rounded-full px-2 py-0.5">Plano</span>}
              {g.description && <p className="text-xs text-gray-500 mt-2 line-clamp-2">{g.description}</p>}
              <div className="flex gap-2 mt-4">
                <button onClick={() => nav('/workout-library')} className="flex-1 h-8 rounded-md border bg-white hover:bg-gray-50 text-xs font-medium inline-flex items-center justify-center gap-1"><Play size={14} /> View</button>
                <button onClick={() => setEdit(g)} className="flex-1 h-8 rounded-md border bg-white hover:bg-gray-50 text-xs font-medium inline-flex items-center justify-center gap-1"><Pencil size={14} /> Edit</button>
                <button onClick={() => remove(g)} className="h-8 w-8 grid place-items-center rounded-md border bg-white hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
        {!loading && paged.length === 0 && <div className="col-span-full py-10 text-center text-sm text-gray-500">Sem grupos{q ? ` para "${q}"` : ''}.</div>}
      </div>

      <div className="flex items-center justify-between text-sm bg-white rounded-lg border px-4 py-3">
        <span className="text-gray-600">Showing {paged.length ? (page - 1) * pageSize + 1 : 0} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} groups</span>
        <div className="flex items-center gap-2">
          <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="h-8 px-3 rounded-md border disabled:opacity-40">Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="h-8 px-3 rounded-md border disabled:opacity-40">Next</button>
        </div>
      </div>

      {edit && (
        <div className="fixed inset-0 bg-black/40 z-50 grid place-items-center p-4" onClick={() => setEdit(null)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-lg mb-4">{edit.id ? 'Editar grupo' : 'Novo grupo'}</h3>
            <div className="space-y-3">
              <div><label className="text-xs text-gray-500">Nome</label><input value={edit.name ?? ''} onChange={e => setEdit({ ...edit, name: e.target.value })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
              <div><label className="text-xs text-gray-500">Descrição</label><textarea value={edit.description ?? ''} onChange={e => setEdit({ ...edit, description: e.target.value })} rows={3} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-gray-500">Ordem</label><input type="number" value={edit.order ?? 0} onChange={e => setEdit({ ...edit, order: Number(e.target.value) })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
                <label className="flex items-end gap-2 text-sm pb-2"><input type="checkbox" checked={!!edit.is_workout_plan} onChange={e => setEdit({ ...edit, is_workout_plan: e.target.checked })} /> Plano de treino</label>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setEdit(null)} className="h-9 px-4 rounded-md border text-sm">Cancelar</button>
              <button onClick={save} disabled={saving} className="h-9 px-4 rounded-md bg-primary text-white text-sm font-medium disabled:opacity-50">{saving ? 'A guardar...' : 'Guardar'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
