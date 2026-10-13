import { useState, useMemo, useEffect } from 'react'
import { Search, Filter, Loader2, AlertCircle } from 'lucide-react'
import { apiGet } from '../lib/api'
import workoutsBackup from '../data/workouts-backup.json'
import groupsBackup from '../data/groups-backup.json'

const _localWorkouts:any[] = (workoutsBackup as any).data || []
const _localGroups:any[] = (groupsBackup as any).data || (groupsBackup as any) || []

function toVideos(v:any[]){ return v.map((x:any)=>({ title:x.title, cat:x.workoutGroups?.[0]?.name||'', views:'0 visualizações', img:x.thumbnailUrl||x.thumbnail||'', id:x.id })) }
function toGroups(g:any[]){ return g.map((x:any)=>({ name:x.name, count:(x.workoutCount||0)+' videos', id:x.id, thumb:x.thumbnailUrl })) }

const fallbackGroups = _localGroups.length ? toGroups(_localGroups) : [
  { name:'Perda de Peso', count:'8 videos' },
  { name:'Força e Tonificação', count:'17 videos' },
  { name:'Bem-estar físico e mental', count:'7 videos' },
  { name:'Treinos Livres', count:'2 videos' },
  { name:'Aulas Temáticas (Pilates, Dance, Fight etc)', count:'7 videos' },
  { name:'Primeiros Passos: Movimento, Força e Confiança em 4 semanas', count:'8 videos' },
]
const fallbackVideos = _localWorkouts.length ? toVideos(_localWorkouts) : [
  { title:'Massagem...', cat:'Bem-estar físico e mental', views:'37 visualizações', img:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=220&fit=crop' },
  { title:'TechPower I', cat:'Força e Tonificação', views:'36 visualizações', img:'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=220&fit=crop' },
]

export default function WorkoutLibrary(){
  const [q,setQ]=useState('')
  const [groups,setGroups]=useState(fallbackGroups)
  const [videos,setVideos]=useState(fallbackVideos)
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  useEffect(()=>{
    let alive=true; setLoading(true)
    Promise.allSettled([apiGet('/workouts'), apiGet('/workout-groups')]).then((res)=>{
      if(!alive) return
      const w = res[0].status==='fulfilled' ? (res[0] as any).value : null
      const g = res[1].status==='fulfilled' ? (res[1] as any).value : null
      const wData = w?.data || w
      const gData = g?.data || g
      if(Array.isArray(wData) && wData.length){ setVideos(toVideos(wData)); setErr(null) }
      else if(_localWorkouts.length){ setVideos(toVideos(_localWorkouts)); setErr('API offline — a mostrar backup local 100% (36 treinos, 36 EMS JSON sacados)') }
      if(Array.isArray(gData) && gData.length){ setGroups(toGroups(gData)) }
      else if(_localGroups.length){ setGroups(toGroups(_localGroups)) }
    }).catch(()=>{ if(alive && _localWorkouts.length){ setVideos(toVideos(_localWorkouts)); setErr('API offline — backup local attivo') } }).finally(()=>{ if(alive) setLoading(false)})
    return ()=>{alive=false}
  },[])
  const filteredGroups = useMemo(()=> q.trim()? groups.filter(g=>g.name.toLowerCase().includes(q.toLowerCase())):groups,[groups,q])
  const filteredVideos = useMemo(()=> q.trim()? videos.filter(v=>v.title.toLowerCase().includes(q.toLowerCase())):videos,[videos,q])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Workout Library</h1>
          <p className="text-gray-600 text-sm mt-1">Netflix-style training videos with EMS integration</p>
          <p className="text-xs text-gray-500 mt-1">Total: {filteredVideos.length} videos cadastrados {err && <span className="text-amber-600">• {err}</span>}</p>
        </div>
        <button className="h-9 px-4 rounded-md bg-primary text-white text-sm font-medium">Create New Workout</button>
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search workouts..." className="h-9 pl-9 pr-3 w-full rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
        <button className="h-9 px-3 rounded-md border bg-white text-sm flex items-center gap-2"><Filter size={16}/>Show Filters</button>
      </div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin"/> Loading workouts...</div>}
      {err && <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2"><AlertCircle size={16}/> {err}</div>}
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Grupos ({filteredGroups.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {filteredGroups.map(g=>(
              <div key={g.name} className="bg-white rounded-lg border p-3 text-center">
                <div className="text-sm font-medium line-clamp-2">{g.name}</div>
                <div className="text-xs text-gray-500 mt-1">{g.count}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Vídeos ({filteredVideos.length}) - 100% backup local se API falhar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredVideos.map(v=>(
              <div key={v.title} className="bg-white rounded-lg border overflow-hidden">
                <img src={v.img} className="w-full h-32 object-cover" alt=""/>
                <div className="p-3">
                  <h4 className="text-sm font-semibold line-clamp-1">{v.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{v.cat}</p>
                  <p className="text-xs text-gray-400 mt-1">{v.views}</p>
                  <div className="flex gap-2 mt-3"><button className="flex-1 h-7 rounded-md border text-xs">Preview</button><button className="flex-1 h-7 rounded-md border text-xs">Edit</button></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
