export default function Performance(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System Performance</h1><p className="text-gray-600 text-sm">Detailed performance metrics and optimization</p>
      <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Response Times</h3><div className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><span>API Avg</span><span className="font-semibold">42ms</span></div><div className="flex justify-between"><span>Database Avg</span><span className="font-semibold">12ms</span></div><div className="flex justify-between"><span>Cache Hit Rate</span><span className="font-semibold text-green-600">96%</span></div></div></div>
    </div>
  )
}
