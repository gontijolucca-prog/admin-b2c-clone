const devices = Array.from({length:12}).map((_,i)=>({ id:`EMS-GG2026P02T${String(i).padStart(3,'0')}`, user:`user${i}@techbody.pt`, status:'Connected', battery:`${85-i*2}%`, seen:'2h ago' }))
export default function EmsDevices(){
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div><h1 className="text-3xl font-bold">EMS Devices</h1><p className="text-gray-600 text-sm mt-1">Track and manage EMS device connectivity and performance</p><p className="text-xs text-gray-500 mt-1">All EMS Devices (89)</p></div>
        <button className="h-9 px-4 rounded-md bg-primary text-white text-sm">Register Device</button>
      </div>
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-xs text-gray-500 border-b"><th className="px-4 py-3 text-left">Device</th><th className="px-4 py-3 text-left">User</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Battery</th><th className="px-4 py-3 text-left">Last Seen</th><th className="px-4 py-3 text-left">Actions</th></tr></thead>
            <tbody>
              {devices.map(d=>(
                <tr key={d.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{d.id}</td>
                  <td className="px-4 py-3">{d.user}</td>
                  <td className="px-4 py-3"><span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">{d.status}</span></td>
                  <td className="px-4 py-3 text-green-600">{d.battery}</td>
                  <td className="px-4 py-3 text-gray-500">{d.seen}</td>
                  <td className="px-4 py-3"><span className="text-gray-400">⋯</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
