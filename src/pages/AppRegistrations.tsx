import { useState, useMemo, useEffect } from 'react'
import { Search, Filter, Clock, Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
const fallbackRows = [
  { name:'Lucca Gontijo', user:'@luccagont', email:'gontijolucca@gmail.com', phone:'+351915136439', date:'09/10/2026, 18:53:27' },
  { name:'P', user:'@Pedro Pinto', email:'pmvp08.email@gmail.com', phone:'+351968921159', date:'17/09/2026, 18:36:40' },
  { name:'Maria José Rosa Vicente', user:'@Maria Vicente', email:'familia.vicenteamaro@gmail.com', phone:'+351966200831', date:'15/08/2026, 10:23:50' },
  { name:'Ricard', user:'@3R', email:'ruiricardoribeiro@hotmail.com', phone:'+351926708951', date:'12/08/2026, 15:55:43' },
  { name:'Teresa Raquel Pinto Miranda', user:'@Raquel', email:'r.raquel.m@gmail.com', phone:'+351914967652', date:'26/07/2026, 13:22:26' },
]
export default function AppRegistrations(){
  const [q,setQ]=useState('')
  const [page,setPage]=useState(1)
  const [rows,setRows]=useState(fallbackRows)
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const pageSize=10
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/app-registrations').then((j:any)=>{
      if(!alive) return
      const list = Array.isArray(j) ? j : j.registrations || j.data || []
      if(Array.isArray(list)&&list.length){
        setRows(list.map((r:any)=>({
          name: r.fullName||r.name||'',
          user: r.username?`@${r.username}`:r.user||'',
          email: r.email||'',
          phone: r.phone||'',
          date: r.createdAt? new Date(r.createdAt).toLocaleString('pt-PT'): r.date||'',
        })))
      }
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  const filtered = useMemo(()=> q.trim()? rows.filter(r=>`${r.name} ${r.email} ${r.user}`.toLowerCase().includes(q.toLowerCase())):rows,[rows,q])
  const totalPages = Math.max(1, Math.ceil(filtered.length/pageSize))
  const paged = filtered.slice((page-1)*pageSize, page*pageSize)
  useEffect(()=>{setPage(1)},[q])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">App Registrations</h1>
          <p className="text-gray-600 mt-1">Manage pre-registrations from the mobile app</p>
          <p className="text-xs text-gray-400 mt-1">Total loaded: {filtered.length} | Filtered: {filtered.length}</p>
        </div>
        <button onClick={()=>window.location.reload()} className="h-9 px-4 rounded-md border bg-white text-sm font-medium">Refresh Data</button>
      </div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading registrations...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached data ({err})</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-6 flex justify-between"><div><p className="text-sm font-medium">Total Registrations</p><p className="text-2xl font-bold mt-2">{filtered.length}</p></div><Clock size={16} className="text-gray-400"/></div>
        <div className="bg-white rounded-lg border p-6 flex justify-between"><div><p className="text-sm font-medium">Pending</p><p className="text-2xl font-bold mt-2">{Math.max(0, filtered.length-10)}</p></div><Clock size={16} className="text-red-400"/></div>
        <div className="bg-white rounded-lg border p-6 flex justify-between"><div><p className="text-sm font-medium">Converted</p><p className="text-2xl font-bold mt-2">10</p></div><span className="text-green-500">✓</span></div>
      </div>
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 flex items-center justify-between bg-blue-50/50 border-b">
          <h3 className="font-semibold">Pre-Registrations List</h3>
          <div className="flex gap-2">
            <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name, email, or user" className="h-9 pl-9 pr-3 w-72 rounded-md border bg-white text-sm"/></div>
            <button className="h-9 w-9 grid place-items-center rounded-md border bg-white"><Filter size={16}/></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-xs text-gray-500 border-b"><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Full Name</th><th className="px-4 py-3 text-left">Username</th><th className="px-4 py-3 text-left">Email</th><th className="px-4 py-3 text-left">Phone</th><th className="px-4 py-3 text-left">Converted Date</th><th className="px-4 py-3 text-left">Created At</th><th className="px-4 py-3 text-left">Actions</th></tr></thead>
            <tbody>
              {paged.map((r,i)=>(
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3"><Clock size={16} className="text-red-500"/></td>
                  <td className="px-4 py-3 font-medium max-w-[140px] truncate">{r.name}</td>
                  <td className="px-4 py-3">{r.user}</td>
                  <td className="px-4 py-3 max-w-[180px] truncate">{r.email}</td>
                  <td className="px-4 py-3">{r.phone}</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3"><span className="flex gap-3 text-xs"><span className="text-blue-600 font-medium">View</span><span className="text-green-600 font-medium">Convert</span><span className="text-red-500">✕</span></span></td>
                </tr>
              ))}
              {paged.length===0 && <tr><td colSpan={8} className="py-10 text-center text-gray-500">No registrations found</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 text-sm border-t">
          <span className="text-gray-600">Showing {(page-1)*pageSize+1} to {Math.min(page*pageSize, filtered.length)} of {filtered.length} registrations</span>
          <div className="flex items-center gap-2"><button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="h-8 px-3 rounded-md border text-gray-400 disabled:opacity-40">Previous</button><span>Page {page} of {totalPages}</span><button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)} className="h-8 px-3 rounded-md border disabled:opacity-40">Next</button></div>
        </div>
      </div>
    </div>
  )
}
