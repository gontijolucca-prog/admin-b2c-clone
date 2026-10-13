import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { House, Users, UserPlus, Layers, Play, ListVideo, CreditCard, Zap, MessageSquare, Bell, UserCheck, Trophy, Video, ChartColumn, ChartNoAxesCombined, Key, Webhook, CreditCard as StripeIcon, Database, UserCog, ScrollText, ShieldCheck, Settings, Sliders } from 'lucide-react'
import { clearSecureToken } from '../lib/api'
import { useEffect, useState } from 'react'
import { getSessionWithRole, signOutAdmin } from '../lib/adminDb'

const REAL_ROUTES = new Set(['/', '/dashboard', '/users', '/app-registrations', '/workout-library', '/workout-groups', '/workout-plans', '/trainers', '/notifications', '/gamification'])

const menu = [
  { to: '/', label: 'Dashboard', icon: House },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/app-registrations', label: 'App Registrations', icon: UserPlus },
  { to: '/user-profiles', label: 'User Profiles', icon: UserCog },
  { to: '/workout-groups', label: 'Workout Groups', icon: Layers },
  { to: '/workout-library', label: 'Workout Library', icon: Play },
  { to: '/workout-plans', label: 'Workout Plans', icon: ListVideo },
  { to: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { to: '/ems-devices', label: 'EMS Devices', icon: Zap },
  { to: '/trainers', label: 'Trainers', icon: UserCheck },
  { to: '/live-sessions', label: 'Live Sessions', icon: Video },
  { to: '/community', label: 'Community', icon: MessageSquare },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/gamification', label: 'Gamification', icon: Trophy },
]

const extra = [
  { to: '/analytics', label: 'Analytics', icon: ChartColumn },
  { to: '/advanced-analytics', label: 'Advanced Analytics', icon: ChartNoAxesCombined },
  { to: '/app-access', label: 'App Access', icon: Key },
  { to: '/monitoring', label: 'Monitoring', icon: ChartColumn },
  { to: '/performance', label: 'Performance', icon: ChartColumn },
  { to: '/api-keys', label: 'API Keys', icon: Key },
  { to: '/webhooks', label: 'Webhooks', icon: Webhook },
  { to: '/stripe', label: 'Stripe Integration', icon: StripeIcon },
  { to: '/backup', label: 'Backup & Restore', icon: Database },
  { to: '/audit-logs', label: 'Audit Logs', icon: ScrollText },
  { to: '/security', label: 'Security & Compliance', icon: ShieldCheck },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/advanced-settings', label: 'Advanced Settings', icon: Sliders },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const nav = useNavigate()
  const loc = useLocation()
  const [checked, setChecked] = useState(false)
  const [email, setEmail] = useState('')
  useEffect(() => {
    let alive = true
    getSessionWithRole().then(({ session, profile }) => {
      if (!alive) return
      if (!session || !profile || profile.role !== 'admin' || profile.status !== 'Active') { nav('/login', { replace: true }); return }
      setEmail(profile.email || session.user.email || '')
      setChecked(true)
    }).catch(() => { if (alive) nav('/login', { replace: true }) })
    return () => { alive = false }
  }, [nav])
  async function logout() {
    await signOutAdmin()
    clearSecureToken()
    nav('/login', { replace: true })
  }
  const isActive = (to: string) => {
    if (to === '/') return loc.pathname === '/' || loc.pathname === '/dashboard'
    return loc.pathname === to || loc.pathname.startsWith(to + '/')
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="min-h-screen bg-gray-100">
        <div className="fixed left-0 top-0 h-full bg-gray-900 text-white z-50 border-r border-gray-800 w-64 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-700 shrink-0">
            <div className="flex items-center gap-2">
              <img src="/assets/techbody-logo.png" alt="TECHBODY Logo" className="w-16 h-16 object-contain" />
              <h1 className="text-[18px] font-semibold text-primary tracking-wide" style={{ lineHeight: '12px' }}>TECHBODY</h1>
            </div>
            <button onClick={() => nav('/')} className="w-10 h-10 grid place-items-center rounded-md text-gray-400 hover:text-white hover:bg-gray-800">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
            </button>
          </div>
          <nav className="mt-8 px-2 overflow-y-auto flex-1 pb-20 custom-scrollbar-hide space-y-0">
            {menu.map(m => {
              const Icon = m.icon
              const active = isActive(m.to)
              return (
                <NavLink key={m.to} to={m.to} className={() => `flex items-center w-full px-4 py-2 h-12 mb-1 rounded-md text-sm font-medium transition-colors ${active ? 'bg-primary text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>
                  <Icon size={20} className="shrink-0" />
                  <span className="ml-3 font-medium">{m.label}</span>
                </NavLink>
              )
            })}
            {extra.map(m => {
              const Icon = m.icon
              const active = isActive(m.to)
              return (
                <NavLink key={m.to} to={m.to} className={() => `flex items-center w-full px-4 py-2 h-12 mb-1 rounded-md text-sm font-medium transition-colors ${active ? 'bg-primary text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>
                  <Icon size={20} className="shrink-0" />
                  <span className="ml-3 font-medium">{m.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>
        <div className="ml-64 transition-all duration-300">
          <header className="bg-white shadow-sm border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 md:py-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                  <input placeholder="Search..." className="h-10 pl-10 pr-4 w-80 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <button className="relative w-10 h-10 grid place-items-center rounded-md hover:bg-accent">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                  <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-white text-xs font-semibold">3</span>
                </button>
                <button onClick={logout} className="flex items-center gap-3 px-3 py-1 rounded-md hover:bg-accent" title="Logout">
                  <span className="w-8 h-8 rounded-full bg-primary text-white grid place-items-center text-sm font-medium">A</span>
                  <span className="hidden lg:block text-left">
                    <span className="block text-sm font-medium text-gray-900 leading-none">{email || 'Admin'}</span>
                    <span className="block text-xs text-gray-500">Administrator</span>
                  </span>
                </button>
              </div>
            </div>
          </header>
          <main className="p-3 sm:p-4 md:p-6 bg-gray-100 min-h-[calc(100vh-64px)]">
            <div className="max-w-full overflow-x-hidden">
              {!REAL_ROUTES.has(loc.pathname) && (
                <div className="mb-4 flex items-center gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-4 py-2.5">
                  <span className="inline-flex items-center rounded-full bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5">DEMO</span>
                  Esta página ainda é demonstração — os dados são de exemplo e não afetam a app.
                </div>
              )}
              {checked ? children : <div className="py-20 text-center text-sm text-gray-500">A verificar sessão…</div>}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
