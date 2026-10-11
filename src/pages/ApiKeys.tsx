import { useState, useMemo, useEffect } from 'react'
import { Search, Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
export default function ApiKeys(){
  const [q,setQ]=useState('')
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [keys,setKeys]=useState<any[]>([])
  const [stats,setStats]=useState({ total:0, active:0, requests:0, expiring:0 })
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/api-keys').then((j:any)=>{
      if(!alive) return
      const list = Array.isArray(j)? j : j.keys || j.data || []
      if(Array.isArray(list)) setKeys(list)
      setStats({ total: j.total ?? list.length ?? 0, active: j.active ?? 0, requests: j.requests ?? 0, expiring: j.expiring ?? 0 })
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  const filtered = useMemo(()=> q.trim()? keys.filter((k:any)=> `${k.name||''} ${k.key||''}`.toLowerCase().includes(q.toLowerCase())):keys,[keys,q])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div><h1 className="text-3xl font-bold">API Key Management</h1><p className="text-gray-600 text-sm mt-1">Manage API keys and monitor usage</p></div>
        <div className="flex gap-2"><button className="h-9 px-4 rounded-md border bg-white text-sm flex items-center gap-2">Export Usage</button><button className="h-9 px-4 rounded-md bg-primary text-white text-sm flex items-center gap-2">Create API Key</button></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-5 flex gap-3"><div className="text-blue-500 mt-1">○</div><div><p className="text-sm font-medium">Total Keys</p><p className="text-2xl font-bold text-blue-600">{stats.total}</p></div></div>
        <div className="bg-white rounded-lg border p-5 flex gap-3"><div className="text-green-500 mt-1">✓</div><div><p className="text-sm font-medium">Active Keys</p><p className="text-2xl font-bold text-green-600">{stats.active}</p></div></div>
        <div className="bg-white rounded-lg border p-5 flex gap-3"><div className="text-purple-500 mt-1">⚡</div><div><p className="text-sm font-medium">Total Requests</p><p className="text-2xl font-bold text-purple-600">{stats.requests}</p></div></div>
        <div className="bg-white rounded-lg border p-5 flex gap-3"><div className="text-orange-500 mt-1">⚠</div><div><p className="text-sm font-medium">Expiring Soon</p><p className="text-2xl font-bold text-orange-600">{stats.expiring}</p></div></div>
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search API keys..." className="flex-1 h-10 pl-9 pr-3 w-full rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
        <select className="h-10 px-3 rounded-md border bg-white text-sm"><option>All Status</option></select>
        <select className="h-10 px-3 rounded-md border bg-white text-sm"><option>All Environments</option></select>
      </div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading API keys...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — showing 0 state ({err})</div>}
      <div className="bg-white rounded-lg border p-12 text-center text-gray-500 text-sm">
        {filtered.length? filtered.map((k:any,i:number)=>(<div key={i} className="text-left border-b py-3 flex justify-between"><span className="font-mono text-xs">{k.key||k.name}</span><span className="text-xs text-green-600">{k.status||'Active'}</span></div>)) : "No API keys found"}
      </div>
    </div>
  )
}
