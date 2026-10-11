import { useEffect, useState } from 'react'
import { Users, Zap, Activity, DollarSign, TrendingUp } from 'lucide-react'
import { apiGet } from '../lib/api'

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 84, ems: 98, sessions: 0, revenue: 0, loading: false })
  useEffect(()=>{
    let alive=true
    setStats(s=>({...s, loading:true}))
    apiGet('/api/dashboard').then((j:any)=>{
      if(!alive) return
      setStats({ users: j.users ?? j.activeUsers ?? 84, ems: j.emsDevices ?? j.ems ?? 98, sessions: j.sessions ?? 0, revenue: j.revenue ?? 0, loading:false })
    }).catch(()=>{ if(alive) setStats(s=>({...s, loading:false}))})
    return ()=>{alive=false}
  },[])
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fitness EMS Platform</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Monitor your fitness platform with EMS integration and user engagement.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="rounded-lg bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#EC4899] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Get Our Mobile App</h3>
          <p className="text-white/90 text-sm sm:text-base">Download the TechBody EMS fitness app and take your workouts anywhere</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a href="#" onClick={e=>e.preventDefault()} className="inline-flex items-center justify-center h-12 px-6 rounded-md border border-white/30 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm text-sm font-medium transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>
            <span className="text-left leading-tight"><span className="block text-xs opacity-90">Download for</span><span className="block font-semibold">Android APK</span></span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          </a>
          <a href="#" onClick={e=>e.preventDefault()} className="inline-flex items-center justify-center h-12 px-6 rounded-md border border-white/30 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm text-sm font-medium transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>
            <span className="text-left leading-tight"><span className="block text-xs opacity-90">Download for</span><span className="block font-semibold">iOS IPA</span></span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Active Users</p>
              <p className="text-2xl font-bold mt-1">{stats.loading?'…':stats.users}</p>
              <div className="flex items-center mt-2 gap-1">
                <TrendingUp size={14} className="text-white/90" />
                <span className="text-sm font-medium">+20.0%</span><span className="text-sm text-white/70 ml-1">from last month</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><Users size={24} className="text-white" /></div>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 text-white shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">EMS Devices</p>
              <p className="text-2xl font-bold mt-1">{stats.ems}</p>
              <div className="flex items-center mt-2 gap-1">
                <TrendingUp size={14} className="text-white/90" />
                <span className="text-sm font-medium">+0.0%</span><span className="text-sm text-white/70 ml-1">from last month</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><Zap size={24} className="text-white" /></div>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Sessions Today</p>
              <p className="text-2xl font-bold mt-1">{stats.sessions}</p>
              <div className="flex items-center mt-2 gap-1">
                <Activity size={14} className="text-white/90" />
                <span className="text-sm font-medium">Live</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><Activity size={24} className="text-white" /></div>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Revenue</p>
              <p className="text-2xl font-bold mt-1">€{stats.revenue}</p>
              <div className="flex items-center mt-2 gap-1">
                <TrendingUp size={14} className="text-white/90" />
                <span className="text-sm font-medium">+12%</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><DollarSign size={24} className="text-white" /></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border shadow-sm p-6">
          <h3 className="font-semibold">User Engagement</h3>
          <p className="text-sm text-gray-500">Daily active users over the last 7 days</p>
          <div className="h-48 mt-4 border-2 border-dashed rounded-lg grid place-items-center text-gray-400 text-sm">Chart — data from /api/analytics</div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="font-semibold">Recent Platform Activity</h3>
          <div className="mt-4 space-y-3">
            <div className="flex gap-3 items-center"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 grid place-items-center text-xs font-semibold">GE</span><div><p className="text-sm font-medium">geral7554 joined</p><p className="text-xs text-gray-500">2 hours ago</p></div></div>
            <div className="flex gap-3 items-center"><span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 grid place-items-center text-xs font-semibold">AN</span><div><p className="text-sm font-medium">anavitoriasantiago workout</p><p className="text-xs text-gray-500">5 hours ago</p></div></div>
          </div>
          <h3 className="font-semibold mt-6">Quick Actions</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button className="h-9 rounded-md border bg-white text-sm">Create Workout</button>
            <button className="h-9 rounded-md border bg-white text-sm">Manage Users</button>
          </div>
        </div>
      </div>
    </div>
  )
}
