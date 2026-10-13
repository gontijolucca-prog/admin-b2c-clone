import { useState, useMemo, useEffect } from 'react'
import { Search, Loader2, AlertCircle, Plus, Pencil, Trash2 } from 'lucide-react'
import { listTrainers, saveTrainer, deleteTrainer, type Trainer } from '../lib/adminDb'

const empty: Partial<Trainer> = { name: '', email: '', phone: '', specialization: '', status: 'Active' }

export default function Trainers() {
  const [q, setQ] = useState('')
  const [rows, setRows] = useState<Trainer[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [edit, setEdit] = useState<Partial<Trainer> | null>(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    listTrainers().then(list => { setRows(list); setErr(null) })
      .catch((e: Error) => setErr(e.message))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])
  const flash = (m: string) => { setNote(m); setTimeout(() => setNote(null), 3000) }

  const save = async () => {
    if (!edit || !edit.name?.trim()) { flash('Nome obrigatório'); return }
    setSaving(true)
    try { await saveTrainer(edit); flash('Trainer guardado'); setEdit(null); load() }
    catch (e: any) { flash('Erro: ' + e.message) }
    finally { setSaving(false) }
  }
  const remove = async (t: Trainer) => {
    if (!confirm(`Apagar trainer "${t.name}"?`)) return
    try { await deleteTrainer(t.id); flash('Trainer apagado'); load() }
    catch (e: any) { flash('Erro: ' + e.message) }
  }

  const filtered = useMemo(() => q.trim() ? rows.filter(t => `${t.name} ${t.specialization} ${t.email}`.toLowerCase().includes(q.toLowerCase())) : rows, [rows, q])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div><h1 className="text-3xl font-bold">Trainers</h1><p className="text-gray-600 text-sm mt-1">Treinadores atribuídos aos treinos da app</p></div>
        <button onClick={() => setEdit({ ...empty })} className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-white text-sm shrink-0"><Plus size={16} /> Add Trainer</button>
      </div>
      {note && <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">{note}</div>}
      <div className="relative max-w-md"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search trainers..." className="h-9 pl-9 pr-3 w-full rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin" /> Loading trainers...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16} /> {err}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map(t => (
          <div key={t.id} className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-full bg-primary/10 grid place-items-center text-primary font-bold">{(t.name || 'T')[0]}</div>
              <div className="flex gap-2">
                <button onClick={() => setEdit(t)} className="h-8 w-8 grid place-items-center rounded-md border hover:bg-gray-50"><Pencil size={14} /></button>
                <button onClick={() => remove(t)} className="h-8 w-8 grid place-items-center rounded-md border hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
            <h3 className="font-semibold mt-3">{t.name}</h3>
            <p className="text-sm text-gray-500">{t.specialization || '—'} • {t.rating ?? '5.0'} rating</p>
            <p className="text-xs text-gray-400 mt-1">{t.email || t.phone || ''}</p>
            <span className={`inline-block mt-3 text-xs px-2 py-1 rounded-full border ${t.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>{t.status === 'Active' ? 'Ativo' : t.status || 'Inativo'}</span>
          </div>
        ))}
        {filtered.length === 0 && !loading && <div className="col-span-3 py-10 text-center text-sm text-gray-500">Sem trainers{q ? ` para "${q}"` : ''}.</div>}
      </div>

      {edit && (
        <div className="fixed inset-0 bg-black/40 z-50 grid place-items-center p-4" onClick={() => setEdit(null)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-lg mb-4">{edit.id ? 'Editar trainer' : 'Novo trainer'}</h3>
            <div className="space-y-3">
              <div><label className="text-xs text-gray-500">Nome</label><input value={edit.name ?? ''} onChange={e => setEdit({ ...edit, name: e.target.value })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
              <div><label className="text-xs text-gray-500">Email</label><input value={edit.email ?? ''} onChange={e => setEdit({ ...edit, email: e.target.value })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
              <div><label className="text-xs text-gray-500">Telefone</label><input value={edit.phone ?? ''} onChange={e => setEdit({ ...edit, phone: e.target.value })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
              <div><label className="text-xs text-gray-500">Especialização</label><input value={edit.specialization ?? ''} onChange={e => setEdit({ ...edit, specialization: e.target.value })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
              <div><label className="text-xs text-gray-500">Estado</label><select value={edit.status ?? 'Active'} onChange={e => setEdit({ ...edit, status: e.target.value })} className="h-9 w-full rounded-md border px-3 text-sm"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
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
