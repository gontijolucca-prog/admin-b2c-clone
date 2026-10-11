import { Search, Filter } from 'lucide-react'
const users = [
  { id: 'CA', name: 'carlasousa3801', full: 'Carla sousa', email: 'carla.sousa@me.com', sub: '-', role: 'User', ems: '-', status: 'Active', avatar: '' },
  { id: 'VA', name: 'vaniacfernandes19782502', full: 'Vânia Carina Fernandes Tinoco', email: 'vaniacfernandes1978@gmail.com', sub: '-', role: 'User', ems: '-', status: 'Active', avatar: '' },
  { id: 'AL', name: 'alexandrefsoares7336', full: 'alexandre soares', email: 'alexandrefsoares@gmail.com', sub: '-', role: 'User', ems: '-', status: 'Active', avatar: '' },
  { id: 'GE', name: 'geral7554', full: 'Marta Lourenço Unipessoal Lda', email: 'geral@rebootbodystudio.pt', sub: '-', role: 'User', ems: 'EMS-GG2026P02T060', status: 'Active', avatar: '', highlight: true },
  { id: 'AN', name: 'anavitoriasantiago2561696', full: 'Ana', email: 'anavitoriasantiago256@gmail.com', sub: '-', role: 'User', ems: 'EMS-GG2026P02T010', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=5' },
  { id: 'AN2', name: 'anampereira72678154', full: 'Ana Pereira', email: 'anampereira7267@gmail.com', sub: '-', role: 'User', ems: 'EMS-GG2026P02T041', status: 'Active', avatar: '' },
  { id: 'CA2', name: 'Carlos Silva', full: 'Carlos Silva', email: 'cmsilva246@gmail.com', sub: '-', role: 'User', ems: 'EMS-GG2026P02T111', status: 'Active', avatar: '' },
  { id: 'DA', name: 'David', full: 'David', email: 'david.c.invest@gmail.com', sub: '-', role: 'User', ems: 'EMS-GG2026P02T001', status: 'Active', avatar: '' },
  { id: 'LE', name: 'Leticia Rodrigues', full: 'Leticia Rodrigues', email: 'lboahora@yahoo.com', sub: '-', role: 'User', ems: 'EMS-GG2026P02T119', status: 'Active', avatar: '' },
  { id: 'LU', name: 'Luis Gomes', full: 'Luis Gomes', email: 'luismiguel.m.gomes@gmail.com', sub: '-', role: 'User', ems: 'EMS-GG2026P02T119', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=12' },
]

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Users</h1>
          <p className="text-gray-600 mt-1">Manage users, their EMS devices, and fitness progress</p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5v14"/></svg>
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold">All Users (10)</h2>
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input placeholder="Search users..." className="h-9 pl-9 pr-3 w-64 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <button className="h-9 w-9 grid place-items-center rounded-md border border-input hover:bg-accent">
                <Filter size={16} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">User</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">Name</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">E-mail</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">Subscription</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">Role</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">EMS Device</th>
                  <th className="pb-3 pt-2 px-2 text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.name} className={`border-b last:border-0 hover:bg-gray-50 ${u.highlight ? 'bg-gray-50/70' : ''}`}>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center gap-2">
                        {u.avatar ? <img src={u.avatar} className="w-8 h-8 rounded-full object-cover" /> : <span className="w-8 h-8 rounded-full bg-[#fff4e6] text-[#e68a00] grid place-items-center text-xs font-semibold">{u.id.slice(0,2)}</span>}
                        <span className="text-sm font-medium text-gray-900">{u.name}</span>
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-900 max-w-[160px]">{u.full}</td>
                    <td className="py-3 px-2 text-sm text-gray-900 max-w-[200px] truncate">{u.email}</td>
                    <td className="py-3 px-2 text-sm text-gray-400">
                      <span className="w-6 h-2 rounded-full bg-gray-100 inline-block"></span>
                    </td>
                    <td className="py-3 px-2"><span className="text-xs font-semibold border rounded-full px-2.5 py-0.5">User</span></td>
                    <td className="py-3 px-2 text-sm">
                      <span className="inline-flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
                        <span className="text-sm text-gray-900">{u.ems}</span>
                      </span>
                    </td>
                    <td className="py-3 px-2"><span className="bg-[#FF9B22] text-white text-xs font-semibold rounded-full px-3 py-1">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-4 border-t mt-4 text-sm">
            <span className="text-gray-600">Showing 1 to 10 of 78 users</span>
            <div className="flex items-center gap-2">
              <button disabled className="h-8 px-3 rounded-md border text-gray-400 cursor-not-allowed">Previous</button>
              <span className="text-gray-600">Page 1 of 8</span>
              <button className="h-8 px-3 rounded-md border hover:bg-accent">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
