import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
export default function LiveSessions(){
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [sessions,setSessions]=useState<any[]>([])
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/live-sessions').then((j:any)=>{
      if(!alive) return
      const list = Array.isArray(j)? j : j.sessions || j.data || []
      if(Array.isArray(list)&&list.length) setSessions(list)
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div><h1 className="text-3xl font-bold">Live Sessions</h1><p className="text-gray-600 text-sm mt-1">Schedule and manage live EMS training sessions</p></div>
        <button className="h-9 px-4 rounded-md bg-primary text-white text-sm">Schedule Session</button>
      </div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading sessions...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached empty ({err})</div>}
      {sessions.length ? (
        <div className="grid gap-4">{sessions.map((s:any,i:number)=>(<div key={i} className="bg-white rounded-lg border p-6 flex justify-between"><div><p className="font-semibold">{s.title||'Live Session'}</p><p className="text-sm text-gray-500">{s.date||''}</p></div><span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">{s.status||'Scheduled'}</span></div>))}</div>
      ) : (
        <div className="bg-white rounded-lg border shadow-sm p-12 text-center text-gray-500 text-sm">No live sessions scheduled — create your first session <p className="text-xs text-gray-400 mt-2">Endpoint: /api/live-sessions</p></div>
      )}
    </div>
  )
}
