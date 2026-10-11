export default function AppAccess(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">App Access Tracking</h1><p className="text-gray-600 text-sm">Monitor mobile app access and device usage</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Daily Access</h3><p className="text-2xl font-bold mt-2">1,204</p><p className="text-xs text-green-600">+12% vs yesterday</p></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Unique Devices</h3><p className="text-2xl font-bold mt-2">89</p><p className="text-xs text-gray-500">active devices</p></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Avg Session</h3><p className="text-2xl font-bold mt-2">8 min</p><p className="text-xs text-gray-500">per user</p></div>
      </div>
    </div>
  )
}
