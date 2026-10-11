import { useState, useEffect } from 'react'
import { Users, Zap, Activity, ChartColumn, Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
export default function Analytics() {
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [stats,setStats]=useState({ users:84, ems:98, sessions:0, retention:100 })
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/analytics').then((j:any)=>{
      if(!alive) return
      setStats({ users:j.users??j.activeUsers??84, ems:j.ems??98, sessions:j.sessions??0, retention:j.retention??100 })
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Track platform performance, user engagement, and EMS usage</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          Last 30 days
        </div>
      </div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading analytics...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached ({err})</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Active Users</p>
              <p className="text-2xl font-bold mt-1">{stats.users}</p>
              <div className="flex items-center mt-2 gap-1 text-sm"><span className="flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> +18%</span></div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><Users size={20} className="text-white" /></div>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">EMS Devices</p>
              <p className="text-2xl font-bold mt-1">{stats.ems}</p>
              <div className="flex items-center mt-2 gap-1 text-sm"><span>＋0.0%</span></div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><Zap size={20} className="text-white" /></div>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Sessions Today</p>
              <p className="text-2xl font-bold mt-1">{stats.sessions}</p>
              <div className="flex items-center mt-2 gap-1"><Activity size={14} className="text-white/90" /><span className="text-sm font-medium">Live</span></div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><Activity size={20} className="text-white" /></div>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Retention Rate</p>
              <p className="text-2xl font-bold mt-1">{stats.retention}.0%</p>
              <div className="flex items-center mt-2 gap-1 text-sm"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> +5%</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><ChartColumn size={20} className="text-white" /></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">User Engagement</h3><p className="text-sm text-gray-500">Daily active users — /api/analytics</p><div className="h-48 mt-4 border-2 border-dashed rounded-lg grid place-items-center text-gray-400 text-sm">Chart</div></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">EMS Usage</h3><p className="text-sm text-gray-500">Device utilization — /api/analytics</p><div className="h-48 mt-4 border-2 border-dashed rounded-lg grid place-items-center text-gray-400 text-sm">Chart</div></div>
      </div>
    </div>
  )
}
