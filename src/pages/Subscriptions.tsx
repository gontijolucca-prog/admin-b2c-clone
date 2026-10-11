import { useState, useMemo, useEffect } from 'react'
import { Search, Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
export default function Subscriptions(){
  const [q,setQ]=useState('')
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [subs,setSubs]=useState<any[]>([])
  const pageSize=10
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/subscriptions').then((j:any)=>{
      if(!alive) return
      const list = Array.isArray(j)? j : j.subscriptions || j.data || []
      if(Array.isArray(list)) setSubs(list)
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  const filtered = useMemo(()=> q.trim()? subs.filter((s:any)=> `${s.email||''} ${s.plan||''}`.toLowerCase().includes(q.toLowerCase())):subs,[subs,q])
  const paged = filtered.slice((page-1)*pageSize, page*pageSize)
  useEffect(()=>{setPage(1)},[q])
  const totalPages=Math.max(1,Math.ceil(filtered.length/pageSize))
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold">Subscriptions</h1><p className="text-gray-600 text-sm">Manage user subscriptions and billing</p></div>
        <button className="h-9 px-4 rounded-md bg-primary text-white text-sm">Create Subscription</button>
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search subscriptions..." className="h-9 pl-9 pr-3 w-full rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
      </div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading subscriptions...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached ({err})</div>}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="font-semibold">All Subscriptions ({filtered.length})</h3>
          <button className="h-9 px-4 rounded-md bg-primary text-white text-sm">Create Subscription</button>
        </div>
        {paged.length===0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-sm">No subscriptions found</p>
            <p className="text-xs mt-1">Subscriptions will appear here when users subscribe</p>
            {filtered.length===0 && subs.length===0 && !loading && <p className="text-xs text-gray-400 mt-2">Endpoint: /api/subscriptions</p>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-xs text-gray-500 border-b bg-gray-50"><th className="px-4 py-3 text-left">User</th><th className="px-4 py-3 text-left">Plan</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Expires</th></tr></thead>
              <tbody>{paged.map((s:any,i:number)=>(<tr key={i} className="border-b hover:bg-gray-50"><td className="px-4 py-3">{s.email||s.user||'-'}</td><td className="px-4 py-3">{s.plan||'-'}</td><td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">{s.status||'Active'}</span></td><td className="px-4 py-3 text-gray-500">{s.expires||'-'}</td></tr>))}</tbody>
            </table>
          </div>
        )}
        {filtered.length>0 && <div className="flex items-center justify-between p-4 border-t text-sm"><span className="text-gray-600">Showing {(page-1)*pageSize+1} to {Math.min(page*pageSize, filtered.length)} of {filtered.length}</span><div className="flex gap-2"><button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="h-8 px-3 rounded-md border disabled:opacity-40">Previous</button><span>Page {page} of {totalPages}</span><button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)} className="h-8 px-3 rounded-md border disabled:opacity-40">Next</button></div></div>}
      </div>
    </div>
  )
}
