import { Search, Filter, Clock } from 'lucide-react'
const rows = [
  { name:'Lucca Gontijo', user:'@luccagont', email:'gontijolucca@gmail.com', phone:'+351915136439', date:'09/10/2026, 18:53:27' },
  { name:'P', user:'@Pedro Pinto', email:'pmvp08.email@gmail.com', phone:'+351968921159', date:'17/09/2026, 18:36:40' },
  { name:'Maria José Rosa Vicente', user:'@Maria Vicente', email:'familia.vicenteamaro@gmail.com', phone:'+351966200831', date:'15/08/2026, 10:23:50' },
  { name:'Ricard', user:'@3R', email:'ruiricardoribeiro@hotmail.com', phone:'+351926708951', date:'12/08/2026, 15:55:43' },
  { name:'Teresa Raquel Pinto Miranda', user:'@Raquel', email:'r.raquel.m@gmail.com', phone:'+351914967652', date:'26/07/2026, 13:22:26' },
]
export default function AppRegistrations(){
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">App Registrations</h1>
          <p className="text-gray-600 mt-1">Manage pre-registrations from the mobile app</p>
          <p className="text-xs text-gray-400 mt-1">Total loaded: 36 | Filtered: 36</p>
        </div>
        <button className="h-9 px-4 rounded-md border bg-white text-sm font-medium">Refresh Data</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-6 flex justify-between"><div><p className="text-sm font-medium">Total Registrations</p><p className="text-2xl font-bold mt-2">36</p></div><Clock size={16} className="text-gray-400"/></div>
        <div className="bg-white rounded-lg border p-6 flex justify-between"><div><p className="text-sm font-medium">Pending</p><p className="text-2xl font-bold mt-2">26</p></div><Clock size={16} className="text-red-400"/></div>
        <div className="bg-white rounded-lg border p-6 flex justify-between"><div><p className="text-sm font-medium">Converted</p><p className="text-2xl font-bold mt-2">10</p></div><span className="text-green-500">✓</span></div>
      </div>
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 flex items-center justify-between bg-blue-50/50 border-b">
          <h3 className="font-semibold">Pre-Registrations List</h3>
          <div className="flex gap-2">
            <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input placeholder="Search by name, email, or user" className="h-9 pl-9 pr-3 w-72 rounded-md border bg-white text-sm"/></div>
            <button className="h-9 w-9 grid place-items-center rounded-md border bg-white"><Filter size={16}/></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-xs text-gray-500 border-b"><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Full Name</th><th className="px-4 py-3 text-left">Username</th><th className="px-4 py-3 text-left">Email</th><th className="px-4 py-3 text-left">Phone</th><th className="px-4 py-3 text-left">Converted Date</th><th className="px-4 py-3 text-left">Created At</th><th className="px-4 py-3 text-left">Actions</th></tr></thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3"><Clock size={16} className="text-red-500"/></td>
                  <td className="px-4 py-3 font-medium max-w-[140px]">{r.name}</td>
                  <td className="px-4 py-3">{r.user}</td>
                  <td className="px-4 py-3 max-w-[180px] truncate">{r.email}</td>
                  <td className="px-4 py-3">{r.phone}</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3"><span className="flex gap-3 text-xs"><span className="text-blue-600 font-medium">View</span><span className="text-green-600 font-medium">Convert</span><span className="text-red-500">✕</span></span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 text-sm border-t">
          <span className="text-gray-600">Showing 1 to 10 of 36 registrations</span>
          <div className="flex items-center gap-2"><button className="h-8 px-3 rounded-md border text-gray-400" disabled>Previous</button><span>Page 1 of 4</span><button className="h-8 px-3 rounded-md border">Next</button></div>
        </div>
      </div>
    </div>
  )
}
