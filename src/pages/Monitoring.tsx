export default function Monitoring(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Real-time Monitoring</h1><p className="text-gray-600 text-sm">Monitor platform health and performance in real time</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">CPU Usage</h3><p className="text-2xl font-bold mt-2">23%</p><div className="mt-2 h-2 bg-gray-100 rounded-full"><div className="h-2 bg-primary rounded-full w-[23%]"></div></div></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Memory</h3><p className="text-2xl font-bold mt-2">62%</p><div className="mt-2 h-2 bg-gray-100 rounded-full"><div className="h-2 bg-green-500 rounded-full w-[62%]"></div></div></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Active Connections</h3><p className="text-2xl font-bold mt-2">84</p><p className="text-xs text-gray-500">users online</p></div>
      </div>
    </div>
  )
}
