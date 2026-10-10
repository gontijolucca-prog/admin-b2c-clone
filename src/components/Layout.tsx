import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, ClipboardList, UsersRound, Dumbbell, CalendarCheck,
  CreditCard, Zap, MessageSquare, Bell, GraduationCap, Award, Video, BarChart3,
  LineChart, Eye, Activity, Gauge, Key, Webhook, HardDrive, UserCircle,
  ScrollText, Shield, Settings, Settings2
} from 'lucide-react'

const groups: { title?: string; items: { to: string; label: string; icon: React.ElementType }[] }[] = [
  { items: [{ to: '/', label: 'Dashboard', icon: LayoutDashboard }] },
  { items: [
    { to: '/users', label: 'Users', icon: Users },
    { to: '/app-registrations', label: 'App Registrations', icon: ClipboardList },
    { to: '/user-profiles', label: 'User Profiles', icon: UserCircle },
  ]},
  { title: 'Workouts', items: [
    { to: '/workout-groups', label: 'Workout Groups', icon: UsersRound },
    { to: '/workout-library', label: 'Workout Library', icon: Dumbbell },
    { to: '/workout-plans', label: 'Workout Plans', icon: CalendarCheck },
  ]},
  { title: 'Business', items: [
    { to: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
    { to: '/ems-devices', label: 'EMS Devices', icon: Zap },
    { to: '/trainers', label: 'Trainers', icon: GraduationCap },
    { to: '/live-sessions', label: 'Live Sessions', icon: Video },
  ]},
  { title: 'Engagement', items: [
    { to: '/community', label: 'Community', icon: MessageSquare },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/gamification', label: 'Gamification', icon: Award },
  ]},
  { title: 'Analytics', items: [
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/advanced-analytics', label: 'Advanced Analytics', icon: LineChart },
    { to: '/app-access', label: 'App Access Tracking', icon: Eye },
  ]},
  { title: 'System', items: [
    { to: '/monitoring', label: 'Real-time Monitoring', icon: Activity },
    { to: '/performance', label: 'System Performance', icon: Gauge },
    { to: '/api-keys', label: 'API Keys', icon: Key },
    { to: '/webhooks', label: 'Webhooks', icon: Webhook },
    { to: '/stripe', label: 'Stripe Integration', icon: CreditCard },
    { to: '/backup', label: 'Backup & Restore', icon: HardDrive },
    { to: '/audit-logs', label: 'Audit Logs', icon: ScrollText },
    { to: '/security', label: 'Security & Compliance', icon: Shield },
  ]},
  { title: 'Admin', items: [
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/advanced-settings', label: 'Advanced Settings', icon: Settings2 },
  ]},
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const navgt = useNavigate()
  function logout() {
    localStorage.removeItem('tb_token')
    navgt('/login', { replace: true })
  }
  return (
    <div className="min-h-screen bg-[#f9fafb] flex">
      <aside className="w-[260px] bg-white border-r border-[#eef0f3] hidden md:flex flex-col shrink-0">
        <div className="h-[64px] flex items-center gap-3 px-5 border-b border-[#eef0f3] shrink-0">
          <div className="w-9 h-9 bg-[#FF9B22] rounded-md grid place-items-center text-white font-black text-[18px]">U</div>
          <span className="font-extrabold tracking-widest text-[#FF9B22] text-[12px]">TECHBODY</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {groups.map((g, idx) => (
            <div key={idx}>
              {g.title && <div className="px-3 mb-2 text-[10px] font-bold tracking-widest text-[#98a1b0] uppercase">{g.title}</div>}
              <div className="space-y-1">
                {g.items.map(n => {
                  const Icon = n.icon
                  return (
                    <NavLink key={n.to} to={n.to} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium border ${isActive ? 'bg-[#fff4e6] text-[#7a3d00] border-[#ffe2b8]' : 'text-[#344054] border-transparent hover:bg-[#f9fafb]'}`}>
                      <Icon size={16} className="shrink-0" />{n.label}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-[#eef0f3]">
          <button onClick={logout} className="w-full h-9 rounded-lg border border-[#e5e7eb] text-[13px] font-semibold text-[#344054] hover:bg-[#f9fafb]">Logout</button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[64px] bg-white border-b border-[#eef0f3] flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="font-semibold text-[#101828]">Admin Panel</div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#667085] hidden sm:block">admin@techbody.pt</span>
            <div className="w-8 h-8 rounded-full bg-[#ffe4bf] grid place-items-center text-[12px] font-bold text-[#8a4d00]">A</div>
          </div>
        </header>
        <main className="p-4 md:p-6 bg-[#f9fafb] flex-1">{children}</main>
      </div>
    </div>
  )
}
