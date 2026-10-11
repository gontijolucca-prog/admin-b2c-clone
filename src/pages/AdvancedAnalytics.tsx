import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
export default function AdvancedAnalytics(){
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [cards,setCards]=useState([
    {k:'Total Revenue',v:'0',sub:'0% from last 30 days'},
    {k:'Active Users',v:'46',sub:'1433.3% from last 30 days',green:true},
    {k:'Workout Sessions',v:'0',sub:'0% from last 30 days'},
    {k:'Device Utilization',v:'110.1',sub:'0% from last 30 days'},
    {k:'Subscriptions',v:'0',sub:'0% from last 30 days'},
    {k:'User Retention',v:'54.8',sub:'0% from last 30 days'},
    {k:'Support Tickets',v:'0',sub:'0% from last 30 days'},
    {k:'Conversion Rate',v:'0%',sub:'0% from last 30 days'},
  ])
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/advanced-analytics').then((j:any)=>{
      if(!alive) return
      if(j.cards && Array.isArray(j.cards)) setCards(j.cards)
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start"><div><h1 className="text-3xl font-bold">Advanced Analytics</h1><p className="text-gray-600 text-sm mt-1">Comprehensive insights and performance metrics for your fitness platform</p></div><div className="flex gap-2"><button className="h-9 px-4 rounded-md border bg-white text-sm">Export CSV</button><button className="h-9 px-4 rounded-md border bg-white text-sm">Export PDF</button></div></div>
      <div className="bg-white rounded-lg border p-4 flex gap-4 items-center">
        <span className="text-sm font-medium flex items-center gap-2">Filters:</span>
        <select className="h-9 px-3 rounded-md border bg-white text-sm"><option>Last 30 days</option></select>
        <select className="h-9 px-3 rounded-md border bg-white text-sm"><option>Overview</option></select>
      </div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading advanced analytics...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached ({err})</div>}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {cards.map(c=>(
          <div key={c.k} className="bg-white rounded-lg border p-4">
            <p className="text-sm font-medium text-gray-600">{c.k}</p>
            <p className="text-2xl font-bold mt-1">{c.v}</p>
            <p className={`text-xs mt-1 ${c.green?'text-green-600':'text-gray-500'}`}>{c.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border p-6"><h3 className="font-bold text-lg">Revenue Trends</h3><p className="text-sm text-gray-500">Monthly revenue growth over time — /api/advanced-analytics</p><div className="h-64 bg-gray-50 rounded-lg mt-4 grid place-items-center text-gray-400 text-sm">No revenue data available</div></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-bold text-lg">Revenue Sources</h3><p className="text-sm text-gray-500">Breakdown by subscription tiers and services</p><div className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><span>Subscription Plans</span><span className="font-semibold">$87,450 (70%)</span></div><div className="flex justify-between"><span>Trainer Sessions</span><span className="font-semibold">$25,320 (20%)</span></div><div className="flex justify-between"><span>Equipment Sales</span><span className="font-semibold">$11,797 (10%)</span></div></div></div>
      </div>
    </div>
  )
}
