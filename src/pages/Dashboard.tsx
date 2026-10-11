import { Users, Zap, Activity, DollarSign, TrendingUp, Play, Video } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fitness EMS Platform</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Monitor your fitness platform with EMS integration and user engagement.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="rounded-lg bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#EC4899] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Get Our Mobile App</h3>
          <p className="text-white/90 text-sm sm:text-base">Download the TechBody EMS fitness app and take your workouts anywhere</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a href="#" onClick={e=>e.preventDefault()} className="inline-flex items-center justify-center h-12 px-6 rounded-md border border-white/30 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm text-sm font-medium transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>
            <span className="text-left leading-tight"><span className="block text-xs opacity-90">Download for</span><span className="block font-semibold">Android APK</span></span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          </a>
          <a href="#" onClick={e=>e.preventDefault()} className="inline-flex items-center justify-center h-12 px-6 rounded-md border border-white/30 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm text-sm font-medium transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>
            <span className="text-left leading-tight"><span className="block text-xs opacity-90">Download for</span><span className="block font-semibold">iOS IPA</span></span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Active Users</p>
              <p className="text-2xl font-bold mt-1">84</p>
              <div className="flex items-center mt-2 gap-1">
                <TrendingUp size={14} className="text-white/90" />
                <span className="text-sm font-medium">+20.0%</span><span className="text-sm text-white/70 ml-1">from last month</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><Users size={24} className="text-white" /></div>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 text-white shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">EMS Devices</p>
              <p className="text-2xl font-bold mt-1">98</p>
              <div className="flex items-center mt-2 gap-1">
                <TrendingUp size={14} className="text-white/90" />
                <span className="text-sm font-medium">+0.0%</span><span className="text-sm text-white/70 ml-1">from last month</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><Zap size={24} className="text-white" /></div>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Workout Sessions</p>
              <p className="text-2xl font-bold mt-1">0</p>
              <div className="flex items-center mt-2 gap-1">
                <TrendingUp size={14} className="text-white/90" />
                <span className="text-sm font-medium">+0.0%</span><span className="text-sm text-white/70 ml-1">from last month</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><Activity size={24} className="text-white" /></div>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Monthly Revenue</p>
              <p className="text-2xl font-bold mt-1">$0</p>
              <div className="flex items-center mt-2 gap-1">
                <TrendingUp size={14} className="text-white/90" />
                <span className="text-sm font-medium">+0.0%</span><span className="text-sm text-white/70 ml-1">from last month</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><DollarSign size={24} className="text-white" /></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold">User Engagement &amp; EMS Usage</h3>
            <p className="text-sm text-muted-foreground">Track platform usage and EMS device activity</p>
          </div>
          <div className="p-6">
            <div className="h-[240px] rounded-lg border-2 border-dashed bg-gradient-to-br from-orange-50/50 to-blue-50/50 flex flex-col items-center justify-center text-gray-400">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              <span className="text-sm font-medium text-gray-600">Chart visualization</span>
              <span className="text-xs">Coming soon</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold">Recent Platform Activity</h3>
            <p className="text-sm text-muted-foreground">Latest user interactions and achievements</p>
          </div>
          <div className="divide-y">
            <div className="flex items-center gap-3 p-4 hover:bg-gray-50">
              <span className="w-10 h-10 rounded-full bg-orange-100 text-primary grid place-items-center text-sm font-medium shrink-0">GE</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">geral7554</p>
                <p className="text-sm text-gray-500 truncate">Connected new EMS device</p>
              </div>
              <span className="text-xs border rounded-full px-2.5 py-0.5 font-semibold shrink-0">1 day ago</span>
            </div>
            <div className="flex items-center gap-3 p-4 hover:bg-gray-50">
              <span className="w-10 h-10 rounded-full bg-orange-100 text-primary grid place-items-center text-sm font-medium shrink-0">AN</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">anavitoriasantiago2561696</p>
                <p className="text-sm text-gray-500 truncate">Connected new EMS device</p>
              </div>
              <span className="text-xs border rounded-full px-2.5 py-0.5 font-semibold shrink-0">2 days ago</span>
            </div>
          </div>
          <div className="flex-1 bg-gray-50/50 min-h-[80px]"></div>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="text-2xl font-semibold">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Frequently used actions to manage your gym</p>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button className="h-24 flex flex-col items-center justify-center gap-2 rounded-md border bg-background hover:bg-blue-50 hover:border-blue-200 transition">
              <Users size={24} className="text-blue-600" />
              <span className="text-sm font-medium">Add User</span>
            </button>
            <button className="h-24 flex flex-col items-center justify-center gap-2 rounded-md border bg-background hover:bg-yellow-50 hover:border-yellow-200 transition">
              <Zap size={24} className="text-yellow-600" />
              <span className="text-sm font-medium">Register EMS Device</span>
            </button>
            <button className="h-24 flex flex-col items-center justify-center gap-2 rounded-md border bg-background hover:bg-primary/10 hover:border-primary/20 transition">
              <Play size={24} className="text-primary" />
              <span className="text-sm font-medium">Upload Workout</span>
            </button>
            <button className="h-24 flex flex-col items-center justify-center gap-2 rounded-md border bg-background hover:bg-purple-50 hover:border-purple-200 transition">
              <Video size={24} className="text-purple-600" />
              <span className="text-sm font-medium">Schedule Live Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
