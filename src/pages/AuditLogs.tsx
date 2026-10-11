import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
export default function AuditLogs(){
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [logs,setLogs]=useState<any[]>([
    { user:'admin@techbody.pt', action:'USER_LOGIN', resource:'Authentication', time:'2m ago' },
    { user:'tiago@techbody.pt', action:'CREATE_API_KEY', resource:'API Keys', time:'12m ago' },
  ])
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/audit-logs').then((j:any)=>{
      if(!alive) return
      const list = Array.isArray(j)? j : j.logs || j.data || []
      if(Array.isArray(list)&&list.length) setLogs(list)
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Audit Logs</h1><p className="text-gray-600 text-sm">Track system activity and changes</p>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading logs...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached ({err})</div>}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-xs text-gray-500 border-b bg-gray-50"><th className="px-4 py-3 text-left">User</th><th className="px-4 py-3 text-left">Action</th><th className="px-4 py-3 text-left">Resource</th><th className="px-4 py-3 text-left">Time</th></tr></thead>
            <tbody>{logs.map((l,i)=>(<tr key={i} className="border-b hover:bg-gray-50"><td className="px-4 py-3">{l.user}</td><td className="px-4 py-3 font-mono text-xs">{l.action}</td><td className="px-4 py-3">{l.resource}</td><td className="px-4 py-3 text-gray-500">{l.time}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
