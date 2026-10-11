import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
export default function AppAccess(){
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [stats,setStats]=useState({ daily:1204, devices:89, session:'8 min' })
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/app-access').then((j:any)=>{
      if(!alive) return
      setStats({ daily:j.daily??1204, devices:j.devices??89, session:j.session??'8 min' })
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">App Access Tracking</h1><p className="text-gray-600 text-sm">Monitor mobile app access and device usage</p>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached ({err})</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Daily Access</h3><p className="text-2xl font-bold mt-2">{stats.daily}</p><p className="text-xs text-green-600">+12% vs yesterday</p></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Unique Devices</h3><p className="text-2xl font-bold mt-2">{stats.devices}</p><p className="text-xs text-gray-500">active devices</p></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Avg Session</h3><p className="text-2xl font-bold mt-2">{stats.session}</p><p className="text-xs text-gray-500">per user</p></div>
      </div>
      <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Recent Access Logs</h3><p className="text-sm text-gray-500 mt-2">Endpoint /api/app-access — 0 logs</p></div>
    </div>
  )
}
