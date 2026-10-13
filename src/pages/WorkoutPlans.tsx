import { useState, useMemo, useEffect } from 'react'
import { Search, Loader2, AlertCircle, Plus, Pencil, Trash2, ListChecks } from 'lucide-react'
import { listGroups, listWorkouts, countGroupWorkouts, saveGroup, deleteGroup, setGroupWorkouts, workloadLinks, type Group, type Workout } from '../lib/adminDb'

export default function WorkoutPlans() {
  const [q, setQ] = useState('')
  const [plans, setPlans] = useState<Group[]>([])
  const [counts, setCounts] = useState<Record<number, number>>({})
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [links, setLinks] = useState<{ workout_id: number; group_id: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [edit, setEdit] = useState<Partial<Group> | null>(null)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    Promise.all([listGroups(), listWorkouts(), countGroupWorkouts(), workloadLinks()])
      .then(([g, w, c, l]) => {
        setPlans(g.filter(x => x.is_workout_plan))
        setWorkouts(w)
        setCounts(c)
        setLinks(l)
        setErr(null)
      })
      .catch((e: Error) => setErr(e.message))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])
  const flash = (m: string) => { setNote(m); setTimeout(() => setNote(null), 3000) }

  const openEdit = (p: Partial<Group>) => {
    setEdit(p)
    setSelected(new Set(links.filter(l => l.group_id === p.id).map(l => l.workout_id)))
  }
  const save = async () => {
    if (!edit || !edit.name?.trim()) { flash('Nome obrigatório'); return }
    setSaving(true)
    try {
      const slug = edit.slug || edit.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      const gid = await saveGroup({ ...edit, slug, is_workout_plan: true })
      if (gid) await setGroupWorkouts(gid, [...selected])
      flash('Plano guardado'); setEdit(null); load()
    } catch (e: any) { flash('Erro: ' + e.message) }
    finally { setSaving(false) }
  }
  const remove = async (p: Group) => {
    if (!confirm(`Apagar plano "${p.name}"?`)) return
    try { await deleteGroup(p.id); flash('Plano apagado'); load() }
    catch (e: any) { flash('Erro: ' + e.message) }
  }
  const toggle = (id: number) => {
    const s = new Set(selected)
    s.has(id) ? s.delete(id) : s.add(id)
    setSelected(s)
  }

  const filtered = useMemo(() => q.trim() ? plans.filter(p => p.name.toLowerCase().includes(q.toLowerCase())) : plans, [plans, q])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">Workout Plans</h1>
          <p className="text-gray-600 text-sm mt-1">Planos organizados com treinos em sequência — visível na app</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search plans..." className="h-9 pl-9 pr-3 w-64 rounded-md border bg-white text-sm" /></div>
          <button onClick={() => openEdit({ name: '', description: '', order: plans.length + 1 })} className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-white text-sm shrink-0"><Plus size={16} /> New Plan</button>
        </div>
      </div>
      {note && <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">{note}</div>}
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin" /> Loading plans...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16} /> {err}</div>}

      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="font-semibold mb-4">Select a Workout Plan ({filtered.length})</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="bg-white rounded-lg border overflow-hidden">
              <div className="h-32 bg-gray-100">
                {p.thumbnail_url
                  ? <img src={p.thumbnail_url} className="w-full h-32 object-cover" alt="" />
                  : <div className="w-full h-32 grid place-items-center text-gray-300 text-sm">sem imagem</div>}
              </div>
              <div className="p-3">
                <h4 className="text-sm font-semibold leading-tight line-clamp-2">{p.name}</h4>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{p.description || ''}</p>
                <p className="text-xs text-gray-600 mt-2 flex items-center gap-1"><ListChecks size={12} /> {counts[p.id] ?? 0} treinos</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(p)} className="flex-1 h-8 rounded-md border hover:bg-gray-50 text-xs font-medium inline-flex items-center justify-center gap-1"><Pencil size={13} /> Edit</button>
                  <button onClick={() => remove(p)} className="h-8 w-8 grid place-items-center rounded-md border hover:bg-red-50 text-red-500"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          ))}
          {!loading && filtered.length === 0 && <p className="col-span-full text-center text-sm text-gray-500 py-8">Sem planos{q ? ` para "${q}"` : ''}.</p>}
        </div>
      </div>

      {edit && (
        <div className="fixed inset-0 bg-black/40 z-50 grid place-items-center p-4" onClick={() => setEdit(null)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-lg mb-4">{edit.id ? 'Editar plano' : 'Novo plano'}</h3>
            <div className="space-y-3">
              <div><label className="text-xs text-gray-500">Nome</label><input value={edit.name ?? ''} onChange={e => setEdit({ ...edit, name: e.target.value })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
              <div><label className="text-xs text-gray-500">Descrição</label><textarea value={edit.description ?? ''} onChange={e => setEdit({ ...edit, description: e.target.value })} rows={2} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
              <div><label className="text-xs text-gray-500">Ordem</label><input type="number" value={edit.order ?? 0} onChange={e => setEdit({ ...edit, order: Number(e.target.value) })} className="h-9 w-32 rounded-md border px-3 text-sm" /></div>
              <div>
                <label className="text-xs text-gray-500">Treinos no plano ({selected.size})</label>
                <div className="mt-2 max-h-64 overflow-y-auto border rounded-md divide-y">
                  {workouts.map(w => (
                    <label key={w.id} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" checked={selected.has(w.id)} onChange={() => toggle(w.id)} />
                      <span className="flex-1 truncate">{w.title}</span>
                      <span className="text-xs text-gray-400">{w.duration_min ?? '—'} min</span>
                    </label>
                  ))}
                </div>
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
