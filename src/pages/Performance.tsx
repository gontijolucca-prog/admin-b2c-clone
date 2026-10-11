import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
export default function Performance(){
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/performance').then(()=>{ if(alive) setErr(null)}).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold text-gray-900">Performance</h1><p className="text-gray-600 mt-1 text-sm">Manage your performance</p></div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading Performance...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — showing placeholder ({err})</div>}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden"><div className="p-8 text-center"><div className="w-12 h-12 rounded-full bg-primary/10 text-primary grid place-items-center mx-auto mb-3">•</div><h3 className="text-lg font-semibold">Performance</h3><p className="text-sm text-gray-500 mt-1">This section is connected to https://admin-b2c.techbody.pt</p><p className="text-sm text-gray-500">Data via /api/performance — fallback placeholder when API offline.</p></div></div>
    </div>
  )
}
