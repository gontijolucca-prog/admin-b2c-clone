import { useEffect, useState } from 'react'
import { Loader2, AlertCircle, Plus, Pencil, Trash2, Trophy } from 'lucide-react'
import { listAchievements, saveAchievement, deleteAchievement, dashboardCounts, type Achievement } from '../lib/adminDb'

const empty = { title: '', description: '', points: 50, icon: 'trophy', active: true }

export default function Gamification() {
  const [rows, setRows] = useState<Achievement[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [edit, setEdit] = useState<Partial<Achievement> | null>(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    Promise.all([listAchievements(), dashboardCounts()])
      .then(([a, c]) => { setRows(a); setTotalPoints(c.totalPoints); setErr(null) })
      .catch((e: Error) => setErr(e.message))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])
  const flash = (m: string) => { setNote(m); setTimeout(() => setNote(null), 3000) }

  const save = async () => {
    if (!edit || !edit.title?.trim()) { flash('Título obrigatório'); return }
    setSaving(true)
    try { await saveAchievement(edit); flash('Conquista guardada'); setEdit(null); load() }
    catch (e: any) { flash('Erro: ' + e.message) }
    finally { setSaving(false) }
  }
  const remove = async (a: Achievement) => {
    if (!confirm(`Apagar conquista "${a.title}"?`)) return
    try { await deleteAchievement(a.id); flash('Conquista apagada'); load() }
    catch (e: any) { flash('Erro: ' + e.message) }
  }
  const toggleActive = async (a: Achievement) => {
    try { await saveAchievement({ id: a.id, active: !a.active }); load() }
    catch (e: any) { flash('Erro: ' + e.message) }
  }

  const active = rows.filter(a => a.active).length
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gamification</h1>
          <p className="text-gray-600 text-sm">Conquistas e pontos — reflete na app</p>
        </div>
        <button onClick={() => setEdit({ ...empty })} className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-white text-sm font-medium"><Plus size={16} /> Nova Conquista</button>
      </div>
      {note && <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">{note}</div>}
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin" /> Loading...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16} /> {err}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Conquistas</h3><p className="text-2xl font-bold mt-2">{rows.length}</p><p className="text-xs text-gray-500">Total</p></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Ativas</h3><p className="text-2xl font-bold mt-2">{active}</p><p className="text-xs text-gray-500">visíveis na app</p></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Pontos Atribuídos</h3><p className="text-2xl font-bold mt-2">{totalPoints.toLocaleString('pt-PT')}</p><p className="text-xs text-gray-500">por treinos concluídos</p></div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="px-6 py-3 font-medium">Conquista</th>
              <th className="px-6 py-3 font-medium">Pontos</th>
              <th className="px-6 py-3 font-medium">Estado</th>
              <th className="px-6 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(a => (
              <tr key={a.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 grid place-items-center"><Trophy size={16} /></span>
                    <div>
                      <p className="text-sm font-medium">{a.title}</p>
                      <p className="text-xs text-gray-500">{a.description || '—'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm">{a.points}</td>
                <td className="px-6 py-3"><button onClick={() => toggleActive(a)} className={`text-xs px-2 py-1 rounded-full border ${a.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>{a.active ? 'Ativa' : 'Inativa'}</button></td>
                <td className="px-6 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEdit(a)} className="h-8 w-8 grid place-items-center rounded-md border hover:bg-gray-50"><Pencil size={14} /></button>
                    <button onClick={() => remove(a)} className="h-8 w-8 grid place-items-center rounded-md border hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && rows.length === 0 && <tr><td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">Sem conquistas. Cria a primeira.</td></tr>}
          </tbody>
        </table>
      </div>

      {edit && (
        <div className="fixed inset-0 bg-black/40 z-50 grid place-items-center p-4" onClick={() => setEdit(null)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-lg mb-4">{edit.id ? 'Editar conquista' : 'Nova conquista'}</h3>
            <div className="space-y-3">
              <div><label className="text-xs text-gray-500">Título</label><input value={edit.title ?? ''} onChange={e => setEdit({ ...edit, title: e.target.value })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
              <div><label className="text-xs text-gray-500">Descrição</label><input value={edit.description ?? ''} onChange={e => setEdit({ ...edit, description: e.target.value })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-gray-500">Pontos</label><input type="number" value={edit.points ?? 0} onChange={e => setEdit({ ...edit, points: Number(e.target.value) })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
                <div><label className="text-xs text-gray-500">Ícone</label><input value={edit.icon ?? 'trophy'} onChange={e => setEdit({ ...edit, icon: e.target.value })} className="h-9 w-full rounded-md border px-3 text-sm" /></div>
              </div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!edit.active} onChange={e => setEdit({ ...edit, active: e.target.checked })} /> Ativa na app</label>
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
