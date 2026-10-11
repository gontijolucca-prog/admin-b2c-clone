import { Search, Filter, Eye, SquarePen, Trash2, Layers } from 'lucide-react'

const groups = [
  { title: 'Perda de Peso', count: 8, img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=260&fit=crop' },
  { title: 'Força e Tonificação', count: 17, img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=260&fit=crop' },
  { title: 'Bem-estar físico e mental', count: 7, img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=260&fit=crop' },
  { title: 'Treinos Livres', count: 2, img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=260&fit=crop' },
  { title: 'Aulas Temáticas (Pilates, Dance, Fight etc)', count: 7, img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=260&fit=crop' },
  { title: 'Primeiros Passos: Movimento, Força e Confiança em 4 semanas', count: 8, img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=260&fit=crop', desc: 'Seleção de treinos organizados com foco e...' },
  { title: 'Queimar Calorias e Secar em 6 semanas', count: 12, img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=260&fit=crop', desc: 'Seleção de treinos organizados com foco na...' },
  { title: 'Glúteos Redondos e Abdominais Fortes em 3 semanas', count: 6, img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=260&fit=crop', desc: 'Seleção de treinos organizados com foco no...' },
  { title: 'Pós-Parto em Equilíbrio: Força, Core e Confiança em 5 semanas!', count: 10, img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=260&fit=crop', desc: 'Seleção de treinos desenvolvidos para apoiar ...' },
  { title: 'Costas Fortes, Corpo Leve em 30 dias', count: 8, img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=260&fit=crop', desc: 'Seleção de programas e treinos com focado no alívi...' },
  { title: 'Mais definição e tonificação em 6 semanas', count: 12, img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=260&fit=crop', desc: 'Seleção e organização de treinos focado na tonificaç...' },
  { title: 'Postura Perfeita: 3 Semanas para um Corpo Alinhado', count: 6, img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=260&fit=crop', desc: 'Seleção e organização de treinos com...' },
  { title: '8 Semanas para a Sua Melhor Versão', count: 16, img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=260&fit=crop', desc: 'Seleção e organização de treinos para promover uma...' },
  { title: 'Pernas Fortes e Invejáveis em 3 semanas', count: 6, img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=260&fit=crop', desc: 'Seleção e organização de treinos focados no...' },
  { title: 'O Método Upper Body: Abs, Ombros, Peito e Braços Definidos em 3 Semanas', count: 6, img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=260&fit=crop', desc: 'Seleção e organização de treinos focados no...' },
]

export default function WorkoutGroups() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workout Groups</h1>
          <p className="text-gray-600 mt-1">Organize workouts into collections and categories</p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-primary hover:bg-primary/90 text-white text-sm font-medium">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5v14"/></svg>
          Create New Group
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input placeholder="Search groups..." className="h-10 pl-10 pr-3 w-full rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button className="h-10 w-10 grid place-items-center rounded-md border border-input bg-background hover:bg-accent">
          <Filter size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {groups.map(g => (
          <div key={g.title} className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col hover:shadow-md transition">
            <div className="h-36 bg-gray-100 overflow-hidden">
              <img src={g.img} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-gray-900 leading-tight flex items-start gap-2">
                  <Layers size={14} className="text-primary mt-0.5 shrink-0" />
                  <span>{g.title}</span>
                </h3>
                <span className="text-xs font-semibold text-gray-900 shrink-0">{g.count}</span>
              </div>
              {g.desc && <p className="text-xs text-gray-500 mt-2 line-clamp-2">{g.desc}</p>}
              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 inline-flex items-center justify-center gap-1 h-8 rounded-md border border-input bg-background hover:bg-accent text-xs font-medium">
                  <Eye size={12} /> View
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-1 h-8 rounded-md border border-input bg-background hover:bg-accent text-xs font-medium">
                  <SquarePen size={12} /> Edit
                </button>
                <button className="w-8 h-8 grid place-items-center rounded-md border border-input bg-background hover:bg-red-50 text-red-500">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
