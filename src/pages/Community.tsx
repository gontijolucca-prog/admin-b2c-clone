import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
export default function Community(){
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [posts,setPosts]=useState<any[]>([])
  useEffect(()=>{
    let alive=true; setLoading(true)
    apiGet('/api/community').then((j:any)=>{
      if(!alive) return
      const list = Array.isArray(j)? j : j.posts || j.data || []
      if(Array.isArray(list)&&list.length) setPosts(list)
      setErr(null)
    }).catch((e:Error)=>{ if(alive) setErr(e.message)}).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div><h1 className="text-3xl font-bold">Community</h1><p className="text-gray-600 text-sm">Manage community posts and interactions</p></div>
        <button className="h-9 px-4 rounded-md border bg-white text-sm">Moderate</button>
      </div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading feed...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> API unavailable — cached empty ({err})</div>}
      <div className="bg-white rounded-lg border shadow-sm p-8 text-center text-gray-500 text-sm">
        {posts.length? posts.map((p:any,i:number)=>(<div key={i} className="text-left border-b py-3 last:border-0"><p className="font-medium text-gray-900">{p.author||'User'}</p><p className="text-sm text-gray-600 mt-1">{p.content||p.text||'-'}</p></div>)) : "Community feed — posts, comments and likes from the mobile app"}
        {posts.length===0 && <p className="text-xs text-gray-400 mt-3">Endpoint: /api/community</p>}
      </div>
    </div>
  )
}
