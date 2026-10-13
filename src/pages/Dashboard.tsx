import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Activity, Flame, Trophy, Loader2 } from 'lucide-react'
import { dashboardCounts, listWorkouts, recentCompletions, type RecentCompletion, type Workout } from '../lib/adminDb'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'agora'
  if (m < 60) return `há ${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return `há ${h} h`
  return `há ${Math.floor(h / 24)} d`
}

export default function Dashboard() {
  const nav = useNavigate()
  const [stats, setStats] = useState({ users: 0, workouts: 0, completionsToday: 0, totalPoints: 0 })
  const [recent, setRecent] = useState<RecentCompletion[]>([])
  const [top, setTop] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    Promise.all([dashboardCounts(), recentCompletions(6), listWorkouts()])
      .then(([c, r, w]) => {
        if (!alive) return
        setStats(c)
        setRecent(r)
        setTop([...w].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 5))
        setErr(null)
      })
      .catch((e: Error) => { if (alive) setErr(e.message) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  const cards = [
    { label: 'Utilizadores', value: stats.users, hint: 'contas registadas', Icon: Users, cls: 'from-blue-500 to-blue-600' },
    { label: 'Treinos Ativos', value: stats.workouts, hint: 'publicados na app', Icon: Activity, cls: 'from-yellow-500 to-yellow-600' },
    { label: 'Treinos Hoje', value: stats.completionsToday, hint: 'concluídos hoje', Icon: Flame, cls: 'from-green-500 to-green-600' },
    { label: 'Pontos Atribuídos', value: stats.totalPoints, hint: 'total por treinos', Icon: Trophy, cls: 'from-purple-500 to-purple-600' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fitness EMS Platform</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Dados em tempo real da app TechBody U — tudo o que editares aqui reflete na app.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          {new Date().toLocaleDateString('pt-PT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 size={16} className="animate-spin" /> A carregar dados...</div>}
      {err && <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">Erro a carregar: {err}</div>}

      <div className="rounded-lg bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#EC4899] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">App TechBody U</h3>
          <p className="text-white/90 text-sm sm:text-base">Os utilizadores da app vêem aqui as mudanças que fazes no admin.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button onClick={() => nav('/workout-library')} className="inline-flex items-center justify-center h-12 px-6 rounded-md border border-white/30 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm text-sm font-medium transition">Ver Workout Library</button>
          <button onClick={() => nav('/users')} className="inline-flex items-center justify-center h-12 px-6 rounded-md border border-white/30 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm text-sm font-medium transition">Gerir Utilizadores</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map(c => {
          const Icon = c.Icon
          return (
            <div key={c.label} className={`rounded-lg bg-gradient-to-br ${c.cls} p-6 text-white shadow-sm hover:shadow-lg transition-all`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">{c.label}</p>
                  <p className="text-2xl font-bold mt-1">{loading ? '…' : c.value.toLocaleString('pt-PT')}</p>
                  <p className="text-sm text-white/70 mt-2">{c.hint}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><Icon size={24} className="text-white" /></div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border shadow-sm p-6">
          <h3 className="font-semibold">Treinos mais vistos</h3>
          <p className="text-sm text-gray-500">Top 5 por visualizações na app</p>
          <div className="mt-4 space-y-3">
            {top.map((w, i) => (
              <div key={w.id} className="flex items-center gap-3">
                <span className="w-6 text-sm font-semibold text-gray-400">{i + 1}</span>
                {w.thumbnail_url
                  ? <img src={w.thumbnail_url} alt="" className="w-12 h-8 rounded object-cover bg-gray-100" />
                  : <span className="w-12 h-8 rounded bg-gray-100" />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{w.title}</p>
                  <p className="text-xs text-gray-500">{w.difficulty ?? '—'} • {w.duration_min ?? '—'} min</p>
                </div>
                <span className="text-sm text-gray-600 shrink-0">{w.views ?? 0} views</span>
              </div>
            ))}
            {!loading && top.length === 0 && <p className="text-sm text-gray-500 py-6 text-center">Sem treinos ainda.</p>}
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="font-semibold">Atividade recente</h3>
          <div className="mt-4 space-y-3">
            {recent.map(r => {
              const name = r.profile?.name || r.profile?.email || 'Utilizador'
              return (
                <div key={r.id} className="flex gap-3 items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 grid place-items-center text-xs font-semibold shrink-0">{(name[0] || 'U').toUpperCase()}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{name}</p>
                    <p className="text-xs text-gray-500 truncate">{r.workout?.title ?? 'treino'} • +{r.points_awarded} pts • {timeAgo(r.completed_at)}</p>
                  </div>
                </div>
              )
            })}
            {!loading && recent.length === 0 && <p className="text-sm text-gray-500 py-4">Ainda sem treinos concluídos.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
