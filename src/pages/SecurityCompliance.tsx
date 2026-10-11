export default function SecurityCompliance(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Security & Compliance</h1><p className="text-gray-600 text-sm">Monitor security events and compliance status</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Security Score</h3><p className="text-2xl font-bold mt-2 text-green-600">98%</p><p className="text-xs text-gray-500">Last scan: today</p></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Active Threats</h3><p className="text-2xl font-bold mt-2">0</p><p className="text-xs text-green-600">No threats detected</p></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Compliance</h3><p className="text-2xl font-bold mt-2">100%</p><p className="text-xs text-gray-500">GDPR compliant</p></div>
      </div>
    </div>
  )
}
