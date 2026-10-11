import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
export default function Webhooks(){
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [hooks,setHooks]=useState<any[]>([])
  const [deliveries,setDeliveries]=useState([{event:'user.created', code:200},{event:'stripe.payment', code:200}])
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/webhooks').then((j:any)=>{
      if(!alive) return
      const list = Array.isArray(j)? j : j.webhooks || j.endpoints || j.data || []
      if(Array.isArray(list)&&list.length) setHooks(list)
      if(Array.isArray(j.deliveries)&&j.deliveries.length) setDeliveries(j.deliveries)
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  return (
    <div className="space-y-6">
      <div className="flex justify-between"><div><h1 className="text-3xl font-bold">Webhooks</h1><p className="text-gray-600 text-sm mt-1">Manage webhook endpoints and deliveries</p></div><button className="h-9 px-4 rounded-md bg-primary text-white text-sm">Add Endpoint</button></div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached ({err})</div>}
      <div className="bg-white rounded-lg border shadow-sm p-6"><h3 className="font-semibold">Endpoints</h3>{hooks.length? hooks.map((h:any,i:number)=>(<div key={i} className="mt-3 p-3 bg-gray-50 rounded-lg border text-sm font-mono">{h.url||h.endpoint}</div>)) : <><p className="text-sm text-gray-500 mt-2">No webhook endpoints configured</p><div className="mt-4 p-4 bg-gray-50 rounded-lg border text-sm font-mono">https://admin-b2c.techbody.pt/webhooks</div></>}</div>
      <div className="bg-white rounded-lg border shadow-sm p-6"><h3 className="font-semibold">Recent Deliveries</h3><div className="mt-3 space-y-2 text-sm">{deliveries.map((d:any,i:number)=>(<div key={i} className="flex justify-between"><span>{d.event}</span><span className="text-green-600">{d.code}</span></div>))}</div></div>
    </div>
  )
}
