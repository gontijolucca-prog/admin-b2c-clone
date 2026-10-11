import { useState, useMemo, useEffect } from 'react'
import { Search, Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
const fallback = [
  { title:'Primeiros Passos: Movimento, Força e Confiança em 4 semanas', count:'8 workouts', img:'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=220&fit=crop' },
  { title:'Queimar Calorias e Secar em 6 semanas', count:'12 workouts', img:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=220&fit=crop' },
  { title:'Glúteos Redondos e Abdominais Fortes em 3 semanas', count:'6 workouts', img:'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=220&fit=crop' },
  { title:'Pós-Parto em Equilíbrio: Força, Core e Confiança em 5 semanas!', count:'10 workouts', img:'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=220&fit=crop' },
  { title:'Costas Fortes, Corpo Leve em 30 dias', count:'8 workouts', img:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=260&fit=crop' },
  { title:'Mais definição e tonificação em 6 semanas', count:'12 workouts', img:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=220&fit=crop', highlight:true },
  { title:'Postura Perfeita: 3 Semanas para um Corpo Alinhado', count:'6 workouts', img:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=220&fit=crop' },
  { title:'8 Semanas para a Sua Melhor Versão', count:'16 workouts', img:'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=220&fit=crop' },
]
export default function WorkoutPlans(){
  const [q,setQ]=useState('')
  const [plans,setPlans]=useState(fallback)
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/workout-plans').then((j:any)=>{
      if(!alive) return
      const list = Array.isArray(j)? j : j.plans||j.data||[]
      if(Array.isArray(list)&&list.length) setPlans(list.map((p:any,i:number)=>({title:p.title||p.name||`Plan ${i+1}`, count:(p.count||p.workoutCount||0)+' workouts', img:p.img||p.thumbnail||fallback[i%fallback.length].img, highlight:!!p.highlight})))
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  const filtered = useMemo(()=> q.trim()? plans.filter(p=>p.title.toLowerCase().includes(q.toLowerCase())):plans, [plans,q])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">Workout Plans</h1>
          <p className="text-gray-600 text-sm mt-1">Manage workout plans and organize videos in sequence</p>
        </div>
        <div className="relative hidden sm:block"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search plans..." className="h-9 pl-9 pr-3 w-64 rounded-md border bg-white text-sm"/></div>
      </div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading plans...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached ({err})</div>}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="font-semibold mb-4">Select a Workout Plan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map(p=>(
            <div key={p.title} className={`bg-white rounded-lg border overflow-hidden ${p.highlight ? 'border-primary ring-1 ring-primary' : ''}`}>
              <img src={p.img} className="w-full h-32 object-cover" alt=""/>
              <div className="p-3">
                <h4 className="text-sm font-semibold leading-tight line-clamp-2">{p.title}</h4>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">Seleção de treinos organizados com foco...</p>
                <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">≡ {p.count}</p>
              </div>
            </div>
          ))}
        </div>
        {filtered.length===0 && <p className="text-center text-sm text-gray-500 py-8">No plans for "{q}"</p>}
      </div>
    </div>
  )
}
