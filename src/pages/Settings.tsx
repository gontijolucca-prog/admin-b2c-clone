import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { apiGet, apiPost } from '../lib/api'
export default function Settings(){
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [name,setName]=useState('TechBody')
  const [email,setEmail]=useState('support@techbody.pt')
  const [saving,setSaving]=useState(false)
  const [saved,setSaved]=useState(false)
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/settings').then((j:any)=>{
      if(!alive) return
      if(j.platformName) setName(j.platformName)
      if(j.supportEmail) setEmail(j.supportEmail)
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  async function save(){
    setSaving(true); setSaved(false)
    try{
      const r = await apiPost('/api/settings', { platformName:name, supportEmail:email })
      if(r.ok) setSaved(true)
    } catch {}
    setSaving(false)
  }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1><p className="text-gray-600 text-sm">Manage platform settings and configurations</p>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading settings...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — editing local ({err})</div>}
      <div className="bg-white rounded-lg border shadow-sm p-6 space-y-4">
        <div><h3 className="font-semibold">General Settings</h3><p className="text-sm text-gray-500">Configure general platform preferences — /api/settings</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div><label className="text-sm font-medium">Platform Name</label><input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-md border text-sm"/></div>
          <div><label className="text-sm font-medium">Support Email</label><input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-md border text-sm"/></div>
        </div>
        <button onClick={save} disabled={saving} className="h-9 px-6 rounded-md bg-primary text-white text-sm disabled:opacity-60">{saving?'Saving...':'Save Changes'}</button>
        {saved && <span className="ml-3 text-sm text-green-600">Saved</span>}
      </div>
    </div>
  )
}
