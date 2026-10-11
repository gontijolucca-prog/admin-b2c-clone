import { Search, Filter } from 'lucide-react'
const groups = [
  { name:'Perda de Peso', count:'8 videos' },
  { name:'Força e Tonificação', count:'17 videos' },
  { name:'Bem-estar físico e mental', count:'7 videos' },
  { name:'Treinos Livres', count:'2 videos' },
  { name:'Aulas Temáticas (Pilates, Dance, Fight etc)', count:'7 videos' },
  { name:'Primeiros Passos: Movimento, Força e Confiança em 4 semanas', count:'8 videos' },
]
const videos = [
  { title:'Massagem...', cat:'Bem-estar físico e mental', views:'37 visualizações', img:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=220&fit=crop' },
  { title:'TechPower I', cat:'Força e Tonificação', views:'36 visualizações', img:'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=220&fit=crop' },
  { title:'Recuperação ...', cat:'Bem-estar físico e mental', views:'28 visualizações', img:'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=220&fit=crop' },
  { title:'CORE I', cat:'Força e Tonificação', views:'16 visualizações', img:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=220&fit=crop' },
]
export default function WorkoutLibrary(){
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Workout Library</h1>
          <p className="text-gray-600 text-sm mt-1">Netflix-style training videos with EMS integration</p>
          <p className="text-xs text-gray-500 mt-1">Total: 36 videos cadastrados</p>
        </div>
        <button className="h-9 px-4 rounded-md bg-primary text-white text-sm font-medium">Create New Workout</button>
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input placeholder="Search workouts..." className="h-9 pl-9 pr-3 w-full rounded-md border bg-white text-sm"/></div>
        <button className="h-9 px-3 rounded-md border bg-white text-sm flex items-center gap-2"><Filter size={16}/>Show Filters</button>
      </div>
      <div className="bg-white rounded-lg border shadow-sm p-4 space-y-2">
        {groups.map(g=>(
          <div key={g.name} className="flex items-center justify-between py-3 border-b last:border-0">
            <span className="flex items-center gap-2 text-sm font-medium"><span className="w-2 h-2 bg-primary rounded-sm"></span>{g.name}</span>
            <span className="text-xs text-gray-500 flex items-center gap-1">{g.count} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6"/></svg></span>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-semibold mb-3">Latest Uploaded Videos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map(v=>(
            <div key={v.title} className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <img src={v.img} className="w-full h-36 object-cover"/>
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
  )
}
