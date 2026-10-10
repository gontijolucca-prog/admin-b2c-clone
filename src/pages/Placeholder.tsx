export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="space-y-4">
      <h1 className="text-[22px] font-extrabold text-[#101828]">{title}</h1>
      <div className="bg-white rounded-xl border border-[#eef0f3] shadow-sm p-10 text-center">
        <div className="text-[13px] font-semibold text-[#344054]">{title}</div>
        <div className="text-[13px] text-[#667085] mt-1">Conteúdo em espelho do original — ligado em https://admin-b2c.techbody.pt{`/${title.toLowerCase().replace(/[^a-z]+/g,'-')}`}. Dados via <code className="px-1.5 py-0.5 bg-[#f9fafb] border border-[#eef0f3] rounded text-[12px]">/api</code></div>
      </div>
    </div>
  )
}
