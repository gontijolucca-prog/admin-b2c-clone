export default function ApiKeys() {
  const keys = [
    { name: 'Mobile App', key: 'tbk_••••••••3f9a', created: '2026-10-01', lastUsed: '2h ago' },
    { name: 'Studio Admin', key: 'tbk_••••••••a1c2', created: '2026-09-18', lastUsed: '1d ago' },
  ]
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-extrabold text-[#101828]">API Keys</h1>
        <button className="h-9 px-4 rounded-lg bg-[#FF9B22] text-white text-[13px] font-semibold">Create Key</button>
      </div>
      <div className="bg-white rounded-xl border border-[#eef0f3] shadow-sm p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#f9fafb] border-b border-[#eef0f3]"><tr className="text-[11px] font-semibold tracking-wide text-[#667085] uppercase"><th className="px-5 py-3">Name</th><th className="px-5 py-3">Key</th><th className="px-5 py-3">Created</th><th className="px-5 py-3">Last Used</th><th className="px-5 py-3"></th></tr></thead>
          <tbody className="divide-y divide-[#eef0f3]">{keys.map(k=>(
            <tr key={k.name}><td className="px-5 py-3.5 text-[13.5px] font-medium text-[#101828]">{k.name}</td><td className="px-5 py-3.5 text-[13px] font-mono text-[#344054]">{k.key}</td><td className="px-5 py-3.5 text-[13px] text-[#667085]">{k.created}</td><td className="px-5 py-3.5 text-[13px] text-[#667085]">{k.lastUsed}</td><td className="px-5 py-3.5 text-right"><button className="text-[13px] font-semibold text-red-600">Revoke</button></td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
