const users = [
  { email: 'admin@techbody.pt', role: 'Super Admin', status: 'active' },
  { email: 'tiago@techbody.pt', role: 'Admin', status: 'active' },
  { email: 'luiz@techbody.pt', role: 'Manager', status: 'pending' },
]
export default function Users() {
  return (
    <div className="space-y-4">
      <h1 className="text-[22px] font-extrabold text-[#101828]">Users</h1>
      <div className="bg-white rounded-xl border border-[#eef0f3] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f9fafb] border-b border-[#eef0f3]">
              <tr className="text-[11px] font-semibold tracking-wide text-[#667085] uppercase">
                <th className="px-5 py-3">Email</th><th className="px-5 py-3">Role</th><th className="px-5 py-3">Status</th><th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef0f3]">
              {users.map(u => (
                <tr key={u.email}>
                  <td className="px-5 py-3.5 text-[13.5px] font-medium text-[#101828]">{u.email}</td>
                  <td className="px-5 py-3.5 text-[13.5px] text-[#344054]">{u.role}</td>
                  <td className="px-5 py-3.5"><span className={`text-[11px] font-bold px-2 py-1 rounded-full border ${u.status==='active' ? 'bg-[#ecfdf3] text-[#027a48] border-[#abefc6]' : 'bg-[#fffaeb] text-[#b54708] border-[#fedf89]'}`}>{u.status}</span></td>
                  <td className="px-5 py-3.5 text-right"><button className="text-[13px] font-semibold text-[#FF9B22]">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
