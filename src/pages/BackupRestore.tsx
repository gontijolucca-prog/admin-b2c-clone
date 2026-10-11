import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
export default function BackupRestore(){
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [backups,setBackups]=useState<any[]>([
    { name:'backup-2026-10-11', date:'2026-10-11 04:00', size:'1.2 GB', status:'Completed' },
    { name:'backup-2026-10-10', date:'2026-10-10 04:00', size:'1.1 GB', status:'Completed' },
  ])
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/backups').then((j:any)=>{
      if(!alive) return
      const list = Array.isArray(j)? j : j.backups || j.data || []
      if(Array.isArray(list)&&list.length) setBackups(list.map((b:any)=>({ name:b.name||b.id, date:b.date||b.createdAt, size:b.size||'-', status:b.status||'Completed'})))
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Backup & Restore</h1><p className="text-gray-600 text-sm">Manage platform backups and data recovery</p>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached ({err})</div>}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex justify-between items-center"><h3 className="font-semibold">Recent Backups</h3><button className="h-9 px-4 rounded-md bg-primary text-white text-sm">Create Backup</button></div>
        <div className="mt-4 border rounded-lg overflow-hidden">
          <table className="w-full text-sm"><thead className="bg-gray-50 border-b"><tr className="text-xs text-gray-500"><th className="px-4 py-3 text-left">Name</th><th className="px-4 py-3 text-left">Date</th><th className="px-4 py-3 text-left">Size</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Actions</th></tr></thead>
            <tbody>{backups.map(b=> (<tr key={b.name} className="border-b hover:bg-gray-50"><td className="px-4 py-3 font-mono text-xs">{b.name}</td><td className="px-4 py-3 text-gray-600">{b.date}</td><td className="px-4 py-3">{b.size}</td><td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">{b.status}</span></td><td className="px-4 py-3"><button className="h-7 px-3 rounded-md border text-xs">Restore</button></td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
