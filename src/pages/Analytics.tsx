import { Users, Zap, Activity, ChartColumn } from 'lucide-react'

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Track platform performance, user engagement, and EMS usage</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          Last 30 days
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Active Users</p>
              <p className="text-2xl font-bold mt-1">84</p>
              <div className="flex items-center mt-2 gap-1 text-sm"><span className="flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> +18%</span></div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><Users size={20} className="text-white" /></div>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">EMS Sessions</p>
              <p className="text-2xl font-bold mt-1">1</p>
              <div className="flex items-center mt-2 gap-1 text-sm"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> +32%</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><Zap size={20} className="text-white" /></div>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Avg Session Time</p>
              <p className="text-2xl font-bold mt-1">1 min</p>
              <div className="flex items-center mt-2 gap-1 text-sm"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> +8%</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><Activity size={20} className="text-white" /></div>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Retention Rate</p>
              <p className="text-2xl font-bold mt-1">100.0%</p>
              <div className="flex items-center mt-2 gap-1 text-sm"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> +5%</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg"><ChartColumn size={20} className="text-white" /></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-semibold">User Engagement</h3>
          <p className="text-sm text-muted-foreground mb-4">User activity and engagement metrics</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Total Users</span><span className="font-semibold">84</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Active Users (30d)</span><span className="font-semibold">84</span></div>
            <div className="flex justify-between"><span className="text-gray-600">New Users</span><span className="bg-green-50 text-green-700 border border-green-200 rounded-full px-2 py-0.5 text-xs font-semibold">+12</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Retention Rate</span><span className="font-semibold text-green-600">100.0%</span></div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-semibold">EMS Device Analytics</h3>
          <p className="text-sm text-muted-foreground mb-4">EMS device connectivity and usage patterns</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Total Devices</span><span className="font-semibold">89</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Active Devices</span><span className="font-semibold">98</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Total Sessions</span><span className="bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full px-2 py-0.5 text-xs font-semibold">1</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Avg Session Time</span><span className="font-semibold text-yellow-600">1 min</span></div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-semibold">Workout Library Performance</h3>
          <p className="text-sm text-muted-foreground mb-4">Content engagement and completion rates</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Total Workouts</span><span className="font-semibold">36</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Most Popular</span><span className="bg-purple-100 text-purple-700 rounded-full px-2 py-0.5 text-xs font-semibold">Beginner</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Average Rating</span><span className="font-semibold flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> 0.0</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Completion Rate</span><span className="font-semibold text-green-600">0.0%</span></div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-semibold">Trainer Performance</h3>
          <p className="text-sm text-muted-foreground mb-4">Trainer statistics and ratings</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Total Trainers</span><span className="font-semibold">3</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Active Trainers</span><span className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2 py-0.5 text-xs font-semibold">0</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Average Rating</span><span className="font-semibold flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> 5.0</span></div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-semibold">Subscription Analytics</h3>
          <p className="text-sm text-muted-foreground mb-4">Subscription metrics</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Total Subscriptions</span><span className="font-semibold">0</span></div>
            <div className="flex justify-between"><span className="text-gray-600">New (Last 30 days)</span><span className="bg-green-50 text-green-700 border border-green-200 rounded-full px-2 py-0.5 text-xs font-semibold">+0</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
