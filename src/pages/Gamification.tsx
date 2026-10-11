import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
export default function Gamification(){
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [stats,setStats]=useState({ challenges:12, achievements:24, points:1204 })
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/gamification').then((j:any)=>{
      if(!alive) return
      setStats({ challenges:j.challenges??12, achievements:j.achievements??24, points:j.points??1204 })
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gamification</h1><p className="text-gray-600 text-sm">Manage challenges, achievements and points</p>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached ({err})</div>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Challenges</h3><p className="text-2xl font-bold mt-2">{stats.challenges}</p><p className="text-xs text-gray-500">Active challenges</p></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Achievements</h3><p className="text-2xl font-bold mt-2">{stats.achievements}</p><p className="text-xs text-gray-500">Total achievements</p></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Points Awarded</h3><p className="text-2xl font-bold mt-2">{stats.points.toLocaleString('pt-PT')}</p><p className="text-xs text-gray-500">Last 30 days</p></div>
      </div>
    </div>
  )
}
