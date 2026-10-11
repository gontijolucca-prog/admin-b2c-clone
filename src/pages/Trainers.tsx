import { useState, useMemo, useEffect } from 'react'
import { Search, Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
const fallback=[1,2,3].map(i=>({ name:`Trainer ${i}`, workouts:0, rating:'5.0', avatar:String.fromCharCode(64+i)}))
export default function Trainers(){
  const [q,setQ]=useState('')
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [list,setList]=useState(fallback)
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/trainers').then((j:any)=>{
      if(!alive) return
      const arr = Array.isArray(j)? j : j.trainers || j.data || []
      if(Array.isArray(arr)&&arr.length) setList(arr.map((t:any,i:number)=>({ name:t.name||t.fullName||`Trainer ${i+1}`, workouts:t.workouts||0, rating:t.rating||'5.0', avatar:(t.name||'T')[0]})))
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  const filtered=useMemo(()=> q.trim()? list.filter(t=>t.name.toLowerCase().includes(q.toLowerCase())):list,[list,q])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div><h1 className="text-3xl font-bold">Trainers</h1><p className="text-gray-600 text-sm mt-1">Manage trainers and their assigned workouts</p></div>
        <button className="h-9 px-4 rounded-md bg-primary text-white text-sm shrink-0">Add Trainer</button>
      </div>
      <div className="relative max-w-md"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search trainers..." className="h-9 pl-9 pr-3 w-full rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading trainers...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached ({err})</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map(t=>(
          <div key={t.name} className="bg-white rounded-lg border shadow-sm p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 grid place-items-center text-primary font-bold">{t.avatar}</div>
            <h3 className="font-semibold mt-3">{t.name}</h3>
            <p className="text-sm text-gray-500">{t.workouts} workouts • {t.rating} rating</p>
          </div>
        ))}
        {filtered.length===0 && <div className="col-span-3 py-10 text-center text-sm text-gray-500">No trainers for "{q}"</div>}
      </div>
    </div>
  )
}
