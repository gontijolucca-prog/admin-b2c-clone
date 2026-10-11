export default function ApiKeys(){
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div><h1 className="text-3xl font-bold">API Key Management</h1><p className="text-gray-600 text-sm mt-1">Manage API keys and monitor usage</p></div>
        <div className="flex gap-2"><button className="h-9 px-4 rounded-md border bg-white text-sm flex items-center gap-2">Export Usage</button><button className="h-9 px-4 rounded-md bg-primary text-white text-sm flex items-center gap-2">Create API Key</button></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-5 flex gap-3"><div className="text-blue-500 mt-1">◯</div><div><p className="text-sm font-medium">Total Keys</p><p className="text-2xl font-bold text-blue-600">0</p></div></div>
        <div className="bg-white rounded-lg border p-5 flex gap-3"><div className="text-green-500 mt-1">✓</div><div><p className="text-sm font-medium">Active Keys</p><p className="text-2xl font-bold text-green-600">0</p></div></div>
        <div className="bg-white rounded-lg border p-5 flex gap-3"><div className="text-purple-500 mt-1">⚡</div><div><p className="text-sm font-medium">Total Requests</p><p className="text-2xl font-bold text-purple-600">0</p></div></div>
        <div className="bg-white rounded-lg border p-5 flex gap-3"><div className="text-orange-500 mt-1">⚠</div><div><p className="text-sm font-medium">Expiring Soon</p><p className="text-2xl font-bold text-orange-600">0</p></div></div>
      </div>
      <div className="flex gap-3">
        <input placeholder="Search API keys..." className="flex-1 h-10 px-4 rounded-md border bg-white text-sm"/>
        <select className="h-10 px-3 rounded-md border bg-white text-sm"><option>All Status</option></select>
        <select className="h-10 px-3 rounded-md border bg-white text-sm"><option>All Environments</option></select>
      </div>
      <div className="bg-white rounded-lg border p-12 text-center text-gray-500 text-sm">No API keys found</div>
    </div>
  )
}
