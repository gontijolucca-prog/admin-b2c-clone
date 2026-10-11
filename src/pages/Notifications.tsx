import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
const fallback=[1,2,3].map(()=>({ title:'New Workout Available', detail:'Sent to all users — 2 days ago'}))
export default function Notifications(){
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [list,setList]=useState(fallback)
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/notifications').then((j:any)=>{
      if(!alive) return
      const arr = Array.isArray(j)? j : j.notifications || j.data || []
      if(Array.isArray(arr)&&arr.length) setList(arr.map((n:any)=>({ title:n.title||'Notification', detail:n.detail||n.body||''})))
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notifications</h1><p className="text-gray-600 text-sm">Send and manage push notifications</p>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading notifications...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached ({err})</div>}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="flex justify-between items-center mb-4"><h3 className="font-semibold">Recent Notifications</h3><button className="h-9 px-4 rounded-md bg-primary text-white text-sm">Send Notification</button></div>
        <div className="space-y-3">{list.map((n,i)=>(<div key={i} className="p-4 border rounded-lg bg-gray-50"><p className="text-sm font-medium">{n.title}</p><p className="text-xs text-gray-500">{n.detail}</p></div>))}</div>
      </div>
    </div>
  )
}
