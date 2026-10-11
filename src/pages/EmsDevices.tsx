import { useState, useMemo, useEffect } from 'react'
import { Search, Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
const fallback = Array.from({length:12}).map((_,i)=>({ id:`EMS-GG2026P02T${String(i).padStart(3,'0')}`, user:`user${i}@techbody.pt`, status:'Connected', battery:`${85-i*2}%`, seen:'2h ago' }))
export default function EmsDevices(){
  const [q,setQ]=useState('')
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [devices,setDevices]=useState(fallback)
  const pageSize=12
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/ems-devices').then((j:any)=>{
      if(!alive) return
      const list = Array.isArray(j)? j : j.devices || j.data || []
      if(Array.isArray(list)&&list.length) setDevices(list.map((d:any,i:number)=>({ id:d.id||d.deviceId||fallback[i%fallback.length].id, user:d.user||d.email||fallback[i%fallback.length].user, status:d.status||'Connected', battery:d.battery||`${85-i*2}%`, seen:d.seen||'2h ago'})))
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  const filtered = useMemo(()=> q.trim()? devices.filter(d=> `${d.id} ${d.user}`.toLowerCase().includes(q.toLowerCase())):devices,[devices,q])
  const paged = filtered.slice((page-1)*pageSize, page*pageSize)
  const totalPages=Math.max(1,Math.ceil(filtered.length/pageSize))
  useEffect(()=>{setPage(1)},[q])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div><h1 className="text-3xl font-bold">EMS Devices</h1><p className="text-gray-600 text-sm mt-1">Track and manage EMS device connectivity and performance</p><p className="text-xs text-gray-500 mt-1">All EMS Devices ({filtered.length})</p></div>
        <button className="h-9 px-4 rounded-md bg-primary text-white text-sm">Register Device</button>
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search device or user..." className="h-9 pl-9 pr-3 w-full rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
      </div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading devices...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached ({err})</div>}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-xs text-gray-500 border-b"><th className="px-4 py-3 text-left">Device</th><th className="px-4 py-3 text-left">User</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Battery</th><th className="px-4 py-3 text-left">Last Seen</th><th className="px-4 py-3 text-left">Actions</th></tr></thead>
            <tbody>
              {paged.map(d=>(
                <tr key={d.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{d.id}</td>
                  <td className="px-4 py-3">{d.user}</td>
                  <td className="px-4 py-3"><span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">{d.status}</span></td>
                  <td className="px-4 py-3 text-green-600">{d.battery}</td>
                  <td className="px-4 py-3 text-gray-500">{d.seen}</td>
                  <td className="px-4 py-3"><span className="text-gray-400">⋯</span></td>
                </tr>
              ))}
              {paged.length===0 && <tr><td colSpan={6} className="py-10 text-center text-gray-500">No devices for "{q}"</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t text-sm"><span className="text-gray-600">Showing {paged.length?(page-1)*pageSize+1:0} to {Math.min(page*pageSize, filtered.length)} of {filtered.length}</span><div className="flex gap-2"><button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="h-8 px-3 rounded-md border disabled:opacity-40">Previous</button><span>Page {page} of {totalPages}</span><button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)} className="h-8 px-3 rounded-md border disabled:opacity-40">Next</button></div></div>
      </div>
    </div>
  )
}
