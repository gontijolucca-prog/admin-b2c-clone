import { stats, recentActivities } from '../data/mock'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-[22px] font-extrabold text-[#101828]">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#eef0f3] p-4 shadow-sm">
            <div className="text-[12px] font-semibold tracking-wide text-[#667085] uppercase">{s.label}</div>
            <div className="mt-2 text-[22px] font-extrabold text-[#101828]">{s.value}</div>
            <div className="mt-1 text-[12px]"><span className="text-[#067647] font-semibold">{s.delta}</span> <span className="text-[#98a1b0]">{s.sub}</span></div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#eef0f3] shadow-sm">
          <div className="px-5 py-4 border-b border-[#eef0f3] font-semibold text-[#101828]">Recent Activities</div>
          <div className="divide-y divide-[#eef0f3]">
            {recentActivities.map(a => (
              <div key={a.id} className="px-5 py-3.5 flex items-center justify-between">
                <div>
                  <div className="text-[13.5px] font-semibold text-[#101828]">{a.action} <span className="font-normal text-[#667085]">· {a.resource}</span></div>
                  <div className="text-[12px] text-[#667085]">{a.user} · {a.time}</div>
                </div>
                <span className={`text-[11px] font-bold px-2 py-1 rounded-full border ${a.outcome==='success' ? 'bg-[#ecfdf3] text-[#027a48] border-[#abefc6]' : 'bg-[#fef3f2] text-[#b42318] border-[#fecdc9]'}`}>{a.outcome}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#eef0f3] shadow-sm p-5">
          <div className="font-semibold text-[#101828]">Quick Links</div>
          <div className="mt-3 grid gap-2">
            <a href="#/users" className="h-10 rounded-lg border border-[#eef0f3] grid place-items-center text-[13px] font-semibold text-[#344054] hover:bg-[#f9fafb]">Manage Users</a>
            <a href="#/api-keys" className="h-10 rounded-lg border border-[#eef0f3] grid place-items-center text-[13px] font-semibold text-[#344054] hover:bg-[#f9fafb]">API Keys</a>
            <a href="#/webhooks" className="h-10 rounded-lg border border-[#eef0f3] grid place-items-center text-[13px] font-semibold text-[#344054] hover:bg-[#f9fafb]">Webhooks</a>
          </div>
        </div>
      </div>
    </div>
  )
}
