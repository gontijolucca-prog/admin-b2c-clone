import { useState, useMemo, useEffect } from 'react'
import { Search, Loader2, AlertCircle, Plus, Pencil, Trash2, Play, Upload, X } from 'lucide-react'
import { listWorkouts, listGroups, listTrainers, workloadLinks, saveWorkout, deleteWorkout, uploadThumb, type Workout, type Group, type Trainer } from '../lib/adminDb'

const empty: Partial<Workout> = { title: '', description: '', difficulty: 'Intermediate', duration_min: 25, calories: 50, points: 75, video_url: '', thumbnail_url: '', disabled: false, videoless: false }

export default function WorkoutLibrary() {
  const [q, setQ] = useState('')
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [links, setLinks] = useState<{ workout_id: number; group_id: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [edit, setEdit] = useState<Partial<Workout> | null>(null)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const load = () => {
    setLoading(true)
    Promise.all([listWorkouts(), listGroups(), listTrainers(), workloadLinks()])
      .then(([w, g, t, l]) => { setWorkouts(w); setGroups(g); setTrainers(t); setLinks(l); setErr(null) })
      .catch((e: Error) => setErr(e.message))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])
  const flash = (m: string) => { setNote(m); setTimeout(() => setNote(null), 3000) }

  const groupName = (id: number) => groups.find(g => g.id === id)?.name ?? ''
  const openEdit = (w: Partial<Workout>) => {
    setEdit(w)
    setSelected(new Set(links.filter(l => l.workout_id === w.id).map(l => l.group_id)))
  }
  const save = async () => {
    if (!edit || !edit.title?.trim()) { flash('Título obrigatório'); return }
    setSaving(true)
    try { await saveWorkout(edit, [...selected]); flash('Treino guardado — já visível na app'); setEdit(null); load() }
    catch (e: any) { flash('Erro: ' + e.message) }
    finally { setSaving(false) }
  }
  const remove = async (w: Workout) => {
    if (!confirm(`Apagar treino "${w.title}"?`)) return
    try { await deleteWorkout(w.id); flash('Treino apagado'); load() }
    catch (e: any) { flash('Erro: ' + e.message) }
  }
  const onThumb = async (file: File | undefined) => {
    if (!file || !edit) return
    setUploading(true)
    try { const url = await uploadThumb(file); setEdit(e => ({ ...e, thumbnail_url: url })); flash('Imagem carregada') }
    catch (e: any) { flash('Erro upload: ' + e.message) }
    finally { setUploading(false) }
  }
  const toggle = (id: number) => {
    const s = new Set(selected)
    s.has(id) ? s.delete(id) : s.add(id)
    setSelected(s)
  }

  const filtered = useMemo(() => {
    if (!q.trim()) return workouts
    const s = q.toLowerCase()
    return workouts.filter(w => `${w.title} ${w.difficulty}`.toLowerCase().includes(s))
  }, [workouts, q])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Workout Library</h1>
          <p className="text-gray-600 text-sm mt-1">Vídeos de treino com EMS — ligados à app TechBody U</p>
          <p className="text-xs text-gray-500 mt-1">Total: {filtered.length} treinos</p>
        </div>
        <button onClick={() => openEdit({ ...empty })} className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-white text-sm font-medium"><Plus size={16} /> Create New Workout</button>
      </div>

      {note && <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">{note}</div>}

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search workouts..." className="h-9 pl-9 pr-3 w-full rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
      </div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin" /> Loading workouts...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16} /> {err}</div>}

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Grupos ({groups.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {groups.map(g => (
              <div key={g.id} className="bg-white rounded-lg border p-3 text-center">
                <div className="text-sm font-medium line-clamp-2">{g.name}</div>
                <div className="text-xs text-gray-500 mt-1">{links.filter(l => l.group_id === g.id).length} vídeos</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Vídeos ({filtered.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map(w => (
              <div key={w.id} className="bg-white rounded-lg border overflow-hidden">
                <div className="relative h-32 bg-gray-100">
                  {w.thumbnail_url
                    ? <img src={w.thumbnail_url} className="w-full h-32 object-cover" alt="" />
                    : <div className="w-full h-32 grid place-items-center text-gray-300 text-sm">sem imagem</div>}
                  {w.disabled && <span className="absolute top-2 left-2 text-[10px] bg-red-500 text-white rounded px-1.5 py-0.5">DESATIVADO</span>}
                  {w.videoless && <span className="absolute top-2 right-2 text-[10px] bg-gray-700 text-white rounded px-1.5 py-0.5">SEM VÍDEO</span>}
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-semibold line-clamp-1">{w.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{links.filter(l => l.workout_id === w.id).map(l => groupName(l.group_id)).filter(Boolean).join(', ') || '—'}</p>
                  <p className="text-xs text-gray-400 mt-1">{w.difficulty ?? '—'} • {w.duration_min ?? '—'} min • {w.views ?? 0} views</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => w.video_url && window.open(w.video_url, '_blank')} className="flex-1 h-7 rounded-md border text-xs inline-flex items-center justify-center gap-1"><Play size={12} /> Preview</button>
                    <button onClick={() => openEdit(w)} className="flex-1 h-7 rounded-md border text-xs inline-flex items-center justify-center gap-1"><Pencil size={12} /> Edit</button>
                    <button onClick={() => remove(w)} className="h-7 w-7 grid place-items-center rounded-md border text-red-500 hover:bg-red-50"><Trash2 size={12} /></button>
                  </div>
                </div>
              </div>
            ))}
            {!loading && filtered.length === 0 && <p className="col-span-full text-center text-sm text-gray-500 py-8">Sem treinos{q ? ` para "${q}"` : ''}.</p>}
          </div>
        </div>
      </div>

      {edit && (
        <div className="fixed inset-0 bg-black/40 z-50 grid place-items-center p-4" onClick={() => setEdit(null)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{edit.id ? 'Editar treino' : 'Novo treino'}</h3>
              <button onClick={() => setEdit(null)} className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-100"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <div><label className="text-xs text-gray-500">Título</label><input value={edit.title ?? ''} onChange={e => setEdit({ ...edit, title: e.target.value })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
              <div><label className="text-xs text-gray-500">Descrição</label><textarea value={edit.description ?? ''} onChange={e => setEdit({ ...edit, description: e.target.value })} rows={3} className="w-full rounded-md border px-3 py-2 text-sm" /></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div><label className="text-xs text-gray-500">Dificuldade</label><select value={edit.difficulty ?? 'Intermediate'} onChange={e => setEdit({ ...edit, difficulty: e.target.value })} className="h-9 w-full rounded-md border px-3 text-sm"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>
                <div><label className="text-xs text-gray-500">Duração (min)</label><input type="number" value={edit.duration_min ?? 0} onChange={e => setEdit({ ...edit, duration_min: Number(e.target.value) })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
                <div><label className="text-xs text-gray-500">Calorias</label><input type="number" value={edit.calories ?? 0} onChange={e => setEdit({ ...edit, calories: Number(e.target.value) })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
                <div><label className="text-xs text-gray-500">Pontos</label><input type="number" value={edit.points ?? 50} onChange={e => setEdit({ ...edit, points: Number(e.target.value) })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
              </div>
              <div><label className="text-xs text-gray-500">Trainer</label><select value={edit.trainer_id ?? ''} onChange={e => setEdit({ ...edit, trainer_id: e.target.value ? Number(e.target.value) : null })} className="h-9 w-full rounded-md border px-3 text-sm"><option value="">—</option>{trainers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
              <div><label className="text-xs text-gray-500">URL do vídeo (mp4)</label><input value={edit.video_url ?? ''} onChange={e => setEdit({ ...edit, video_url: e.target.value })} className="h-9 w-full rounded-md border px-3 text-sm" placeholder="https://media.pontofinal.site/techbodyu/10.mp4" /></div>
              <div>
                <label className="text-xs text-gray-500">Thumbnail</label>
                <div className="flex items-center gap-3 mt-1">
                  {edit.thumbnail_url ? <img src={edit.thumbnail_url} className="w-20 h-12 object-cover rounded border" alt="" /> : <span className="w-20 h-12 rounded border bg-gray-50 grid place-items-center text-gray-300 text-xs">nada</span>}
                  <label className="h-9 px-3 rounded-md border text-sm inline-flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                    <Upload size={14} /> {uploading ? 'A carregar...' : 'Carregar imagem'}
                    <input type="file" accept="image/*" className="hidden" onChange={e => onThumb(e.target.files?.[0])} />
                  </label>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Grupos ({selected.size})</label>
                <div className="mt-2 max-h-48 overflow-y-auto border rounded-md divide-y">
                  {groups.map(g => (
                    <label key={g.id} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" checked={selected.has(g.id)} onChange={() => toggle(g.id)} />
                      <span className="flex-1 truncate">{g.name}</span>
                      {g.is_workout_plan && <span className="text-[10px] uppercase bg-purple-50 text-purple-600 border border-purple-200 rounded-full px-2 py-0.5">Plano</span>}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!edit.disabled} onChange={e => setEdit({ ...edit, disabled: e.target.checked })} /> Desativado (escondido na app)</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!edit.videoless} onChange={e => setEdit({ ...edit, videoless: e.target.checked })} /> Sem vídeo</label>
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
