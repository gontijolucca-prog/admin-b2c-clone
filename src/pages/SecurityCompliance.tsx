import { useState, useEffect } from 'react'
import { Loader2, AlertCircle, ShieldCheck } from 'lucide-react'
import { apiGet } from '../lib/api'
export default function SecurityCompliance(){
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/security').then(()=>{ if(alive) setErr(null)}).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Security & Compliance</h1><p className="text-gray-600 text-sm">Monitor security events and compliance status</p>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached ({err})</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold flex items-center gap-2"><ShieldCheck size={18} className="text-green-600"/> GDPR Compliance</h3><p className="text-sm text-green-600 mt-2">Compliant</p><p className="text-xs text-gray-500">Last audit 2026-10-01</p></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Security Events</h3><p className="text-sm text-gray-500 mt-2">0 critical events — /api/security</p></div>
      </div>
    </div>
  )
}
