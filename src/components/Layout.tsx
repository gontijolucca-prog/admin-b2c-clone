import { NavLink, useNavigate } from 'react-router-dom'

const nav = [
  { to: '/', label: 'Dashboard', icon: '◧' },
  { to: '/users', label: 'Users', icon: '👥' },
  { to: '/api-keys', label: 'API Keys', icon: '🔑' },
  { to: '/webhooks', label: 'Webhooks', icon: '↗' },
  { to: '/analytics', label: 'Analytics', icon: '📊' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const navgt = useNavigate()
  function logout() {
    localStorage.removeItem('tb_token')
    navgt('/login', { replace: true })
  }
  return (
    <div className="min-h-screen bg-[#f9fafb] flex">
      <aside className="w-[240px] bg-white border-r border-[#eef0f3] hidden md:flex flex-col">
        <div className="h-[64px] flex items-center gap-3 px-5 border-b border-[#eef0f3]">
          <div className="w-9 h-9 bg-[#FF9B22] rounded-md grid place-items-center text-white font-black">U</div>
          <span className="font-extrabold tracking-widest text-[#FF9B22] text-[12px]">TECHBODY</span>
        </div>
        <nav className="p-3 space-y-1">
          {nav.map(n => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium ${isActive ? 'bg-[#fff4e6] text-[#a85c00] border border-[#ffe2b8]' : 'text-[#344054] hover:bg-[#f9fafb]'}`}>
              <span className="w-5 text-center">{n.icon}</span>{n.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto p-3">
          <button onClick={logout} className="w-full h-9 rounded-lg border border-[#e5e7eb] text-[13px] font-semibold text-[#344054] hover:bg-[#f9fafb]">Logout</button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-[64px] bg-white border-b border-[#eef0f3] flex items-center justify-between px-4 md:px-6">
          <div className="font-semibold text-[#101828]">Admin Panel</div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#667085] hidden sm:block">admin@techbody.pt</span>
            <div className="w-8 h-8 rounded-full bg-[#ffe4bf] grid place-items-center text-[12px] font-bold text-[#8a4d00]">A</div>
          </div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
