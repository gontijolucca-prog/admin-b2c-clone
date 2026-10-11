const plans = [
  { title:'Primeiros Passos: Movimento, Força e Confiança em 4 semanas', count:'8 workouts', img:'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=220&fit=crop' },
  { title:'Queimar Calorias e Secar em 6 semanas', count:'12 workouts', img:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=220&fit=crop' },
  { title:'Glúteos Redondos e Abdominais Fortes em 3 semanas', count:'6 workouts', img:'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=220&fit=crop' },
  { title:'Pós-Parto em Equilíbrio: Força, Core e Confiança em 5 semanas!', count:'10 workouts', img:'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=220&fit=crop' },
  { title:'Costas Fortes, Corpo Leve em 30 dias', count:'8 workouts', img:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=220&fit=crop' },
  { title:'Mais definição e tonificação em 6 semanas', count:'12 workouts', img:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=220&fit=crop', highlight:true },
  { title:'Postura Perfeita: 3 Semanas para um Corpo Alinhado', count:'6 workouts', img:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=220&fit=crop' },
  { title:'8 Semanas para a Sua Melhor Versão', count:'16 workouts', img:'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=220&fit=crop' },
]
export default function WorkoutPlans(){
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Workout Plans</h1>
        <p className="text-gray-600 text-sm mt-1">Manage workout plans and organize videos in sequence</p>
      </div>
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="font-semibold mb-4">Select a Workout Plan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map(p=>(
            <div key={p.title} className={`bg-white rounded-lg border overflow-hidden ${p.highlight ? 'border-primary ring-1 ring-primary' : ''}`}>
              <img src={p.img} className="w-full h-32 object-cover"/>
              <div className="p-3">
                <h4 className="text-sm font-semibold leading-tight line-clamp-2">{p.title}</h4>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">Seleção de treinos organizados com foco...</p>
                <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">≡ {p.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
