import { useState, useMemo, useEffect } from 'react'
import { Search, Filter, Eye, SquarePen, Trash2, Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'

const fallback = [
  { title: 'Perda de Peso', count: 8, img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=260&fit=crop' },
  { title: 'Força e Tonificação', count: 17, img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=260&fit=crop' },
  { title: 'Bem-estar físico e mental', count: 7, img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=260&fit=crop' },
  { title: 'Treinos Livres', count: 2, img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=260&fit=crop' },
  { title: 'Aulas Temáticas (Pilates, Dance, Fight etc)', count: 7, img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=260&fit=crop' },
  { title: 'Primeiros Passos: Movimento, Força e Confiança em 4 semanas', count: 8, img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=260&fit=crop', desc: 'Seleção de treinos organizados com foco e...' },
  { title: 'Queimar Calorias e Secar em 6 semanas', count: 12, img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=260&fit=crop', desc: 'Seleção de treinos organizados com foco na...' },
  { title: 'Glúteos Redondos e Abdominais Fortes em 3 semanas', count: 6, img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=260&fit=crop', desc: 'Seleção de treinos organizados com foco no...' },
  { title: 'Pós-Parto em Equilíbrio: Força, Core e Confiança em 5 semanas!', count: 10, img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=260&fit=crop', desc: 'Seleção de treinos desenvolvidos para apoiar ...' },
  { title: 'Costas Fortes, Corpo Leve em 30 dias', count: 8, img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=260&fit=crop', desc: 'Seleção de programas e treinos com focado no alívi...' },
  { title: 'Mais definição e tonificação em 6 semanas', count: 12, img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=260&fit=crop', desc: 'Seleção e organização de treinos focado na tonificaç...' },
  { title: 'Postura Perfeita: 3 Semanas para um Corpo Alinhado', count: 6, img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=260&fit=crop', desc: 'Seleção e organização de treinos com...' },
  { title: '8 Semanas para a Sua Melhor Versão', count: 16, img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=260&fit=crop', desc: 'Seleção e organização de treinos para promover uma...' },
  { title: 'Pernas Fortes e Invejáveis em 3 semanas', count: 6, img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=260&fit=crop', desc: 'Seleção e organização de treinos focados no...' },
  { title: 'O Método Upper Body: Abs, Ombros, Peito e Braços Definidos em 3 Semanas', count: 6, img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=260&fit=crop', desc: 'Seleção e organização de treinos focados no...' },
]

export default function WorkoutGroups() {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string|null>(null)
  const [groups, setGroups] = useState(fallback)
  const pageSize = 10
  useEffect(()=>{
    let alive=true
    setLoading(true)
    apiGet('/api/workout-groups').then((j:any)=>{
      if(!alive) return
      const list = Array.isArray(j) ? j : j.groups || j.data || []
      if(Array.isArray(list) && list.length){
        setGroups(list.map((g:any,i:number)=>({
          title: g.title||g.name||`Group ${i+1}`,
          count: g.count||g.videoCount||0,
          img: g.img||g.thumbnail||fallback[i%fallback.length].img,
          desc: g.desc||g.description||'',
        })))
      }
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  const filtered = useMemo(()=> q.trim()? groups.filter(g=>g.title.toLowerCase().includes(q.toLowerCase())):groups, [groups,q])
  const totalPages = Math.max(1, Math.ceil(filtered.length/pageSize))
  const paged = filtered.slice((page-1)*pageSize, page*pageSize)
  useEffect(()=>{setPage(1)},[q])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workout Groups</h1>
          <p className="text-gray-600 mt-1">Organize workouts into collections and categories</p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-primary hover:bg-primary/90 text-white text-sm font-medium">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5v14"/></svg>
          Create New Group
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search groups..." className="h-10 pl-10 pr-3 w-full rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button className="h-10 w-10 grid place-items-center rounded-md border border-input bg-background hover:bg-accent">
          <Filter size={18} />
        </button>
      </div>

      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading groups...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached data ({err})</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {paged.map(g => (
          <div key={g.title} className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col hover:shadow-md transition">
            <div className="h-36 bg-gray-100 overflow-hidden">
              <img src={g.img} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">{g.title}</h3>
                <span className="text-xs text-gray-500 shrink-0 flex items-center gap-1">{g.count} videos</span>
              </div>
              {g.desc && <p className="text-xs text-gray-500 mt-2 line-clamp-2">{g.desc}</p>}
              <div className="flex gap-2 mt-4">
                <button className="flex-1 h-8 rounded-md border bg-white hover:bg-gray-50 text-xs font-medium inline-flex items-center justify-center gap-1"><Eye size={14}/> View</button>
                <button className="flex-1 h-8 rounded-md border bg-white hover:bg-gray-50 text-xs font-medium inline-flex items-center justify-center gap-1"><SquarePen size={14}/> Edit</button>
                <button className="h-8 w-8 grid place-items-center rounded-md border bg-white hover:bg-red-50 text-red-500"><Trash2 size={14}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm bg-white rounded-lg border px-4 py-3">
        <span className="text-gray-600">Showing {paged.length?(page-1)*pageSize+1:0} to {Math.min(page*pageSize, filtered.length)} of {filtered.length} groups</span>
        <div className="flex items-center gap-2">
          <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="h-8 px-3 rounded-md border disabled:opacity-40">Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)} className="h-8 px-3 rounded-md border disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>
  )
}
