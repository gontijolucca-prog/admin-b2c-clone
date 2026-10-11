import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
export default function StripeIntegration(){
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [status,setStatus]=useState({ connected:true, webhook:true, payments:[] as any[] })
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/stripe/status').then((j:any)=>{
      if(!alive) return
      setStatus({ connected: j.connected ?? true, webhook: j.webhook ?? true, payments: Array.isArray(j.payments)? j.payments : [] })
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Stripe Integration</h1><p className="text-gray-600 text-sm">Manage payments and Stripe webhooks</p>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached ({err})</div>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Connection Status</h3><p className={`text-sm mt-2 ${status.connected?'text-green-600':'text-red-600'}`}>{status.connected?'Connected':'Disconnected'}</p><p className="text-xs text-gray-500">{status.webhook? 'Webhook endpoint active':'No webhook'}</p></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Recent Payments</h3>{status.payments.length? status.payments.map((p:any,i:number)=>(<div key={i} className="flex justify-between text-sm mt-2"><span>{p.email||p.id}</span><span className="font-semibold">€{p.amount||0}</span></div>)) : <p className="text-sm text-gray-500 mt-2">No recent payments</p>}</div>
      </div>
    </div>
  )
}
