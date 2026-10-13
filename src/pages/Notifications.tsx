import { useState, useEffect } from 'react'
import { Loader2, AlertCircle, Trash2, Send } from 'lucide-react'
import { listNotifications, createNotification, deleteNotification, getSessionWithRole, type Notification } from '../lib/adminDb'

export default function Notifications() {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [list, setList] = useState<Notification[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [target, setTarget] = useState<'all' | 'user'>('all')
  const [userEmail, setUserEmail] = useState('')
  const [adminId, setAdminId] = useState<string>('')

  const load = () => {
    setLoading(true)
    listNotifications().then(l => { setList(l); setErr(null) })
      .catch((e: Error) => setErr(e.message))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    load()
    getSessionWithRole().then(({ session }) => { if (session) setAdminId(session.user.id) })
  }, [])
  const flash = (m: string) => { setNote(m); setTimeout(() => setNote(null), 3000) }

  const send = async () => {
    try {
      let userId: string | null = null
      if (target === 'user') {
        if (!userEmail.trim()) { flash('Escreve o email do utilizador'); return }
        const { sb } = await import('../lib/sb')
        const { data } = await (sb as any).from('profiles').select('id').eq('email', userEmail.trim().toLowerCase()).maybeSingle()
        if (!data) { flash('Email não encontrado'); return }
        userId = data.id
      }
      if (!title.trim()) { flash('Título obrigatório'); return }
      await createNotification({ title: title.trim(), body: body.trim(), target, userId }, adminId)
      setTitle(''); setBody(''); setUserEmail('')
      flash('Notificação enviada — aparece na app de seguida')
      load()
    } catch (e: any) { flash('Erro: ' + e.message) }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notifications</h1><p className="text-gray-600 text-sm">Enviar avisos que aparecem na app TechBody U</p>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin" /> Loading notifications...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16} /> {err}</div>}
      {note && <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">{note}</div>}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="font-semibold mb-4">Enviar nova notificação</h3>
        <div className="grid gap-3 max-w-xl">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" className="h-10 px-3 rounded-md border text-sm" />
          <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Mensagem (opcional)" rows={3} className="px-3 py-2 rounded-md border text-sm" />
          <div className="flex gap-3 items-center">
            <select value={target} onChange={e => setTarget(e.target.value as any)} className="h-10 px-3 rounded-md border text-sm">
              <option value="all">Todos os utilizadores</option>
              <option value="user">Um utilizador (email)</option>
            </select>
            {target === 'user' && <input value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="email@exemplo.com" className="h-10 px-3 rounded-md border text-sm flex-1" />}
            <button onClick={send} className="h-10 px-4 rounded-md bg-primary text-white text-sm inline-flex items-center gap-2"><Send size={15} /> Enviar</button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="font-semibold mb-4">Enviadas ({list.length})</h3>
        <div className="space-y-3">
          {list.map(n => (
            <div key={n.id} className="p-4 border rounded-lg bg-gray-50 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{n.title} <span className="text-xs font-normal text-gray-500">• {n.target === 'all' ? 'todos' : 'user'}</span></p>
                {n.body && <p className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">{n.body}</p>}
                <p className="text-[11px] text-gray-400 mt-1">{new Date(n.created_at).toLocaleString('pt-PT')}</p>
              </div>
              <button onClick={async () => { await deleteNotification(n.id); load() }} className="w-8 h-8 grid place-items-center rounded-md border bg-white hover:bg-red-50 text-red-500 shrink-0"><Trash2 size={14} /></button>
            </div>
          ))}
          {list.length === 0 && <p className="text-sm text-gray-500">Nenhuma notificação enviada ainda.</p>}
        </div>
      </div>
    </div>
  )
}
