export default function ApiKeys() {
  const keys = [
    { name: 'Mobile App', key: 'tbk_••••••••3f9a', created: '2026-10-01', lastUsed: '2h ago' },
    { name: 'Studio Admin', key: 'tbk_••••••••a1c2', created: '2026-09-18', lastUsed: '1d ago' },
  ]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
          <p className="text-gray-600 mt-1 text-sm">Manage API keys for platform integrations</p>
        </div>
        <button className="h-10 px-4 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90">Create Key</button>
      </div>
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr className="text-xs font-medium text-gray-500 uppercase">
              <th className="px-6 py-3">Name</th><th className="px-6 py-3">Key</th><th className="px-6 py-3">Created</th><th className="px-6 py-3">Last Used</th><th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {keys.map(k=>(
              <tr key={k.name} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{k.name}</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-600">{k.key}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{k.created}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{k.lastUsed}</td>
                <td className="px-6 py-4 text-right"><button className="text-sm font-medium text-red-600 hover:text-red-700">Revoke</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
