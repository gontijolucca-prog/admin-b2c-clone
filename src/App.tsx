import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import WorkoutGroups from './pages/WorkoutGroups'
import WorkoutLibrary from './pages/WorkoutLibrary'
import WorkoutPlans from './pages/WorkoutPlans'
import Subscriptions from './pages/Subscriptions'
import EmsDevices from './pages/EmsDevices'
import Community from './pages/Community'
import Notifications from './pages/Notifications'
import Trainers from './pages/Trainers'
import Gamification from './pages/Gamification'
import LiveSessions from './pages/LiveSessions'
import Analytics from './pages/Analytics'
import AppRegistrations from './pages/AppRegistrations'
import ApiKeys from './pages/ApiKeys'
import Webhooks from './pages/Webhooks'
import Placeholder from './pages/Placeholder'
import AuditLogs from './pages/AuditLogs'
import Layout from './components/Layout'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('tb_token')
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}
function P({ title }: { title: string }) { return <RequireAuth><Layout><Placeholder title={title} /></Layout></RequireAuth> }

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth><Layout><Dashboard /></Layout></RequireAuth>} />
      <Route path="/dashboard" element={<RequireAuth><Layout><Dashboard /></Layout></RequireAuth>} />
      <Route path="/users" element={<RequireAuth><Layout><Users /></Layout></RequireAuth>} />
      <Route path="/app-registrations" element={<RequireAuth><Layout><AppRegistrations /></Layout></RequireAuth>} />
      <Route path="/user-profiles" element={<P title="User Profiles" />} />
      <Route path="/workout-groups" element={<RequireAuth><Layout><WorkoutGroups /></Layout></RequireAuth>} />
      <Route path="/workout-library" element={<RequireAuth><Layout><WorkoutLibrary /></Layout></RequireAuth>} />
      <Route path="/workout-plans" element={<RequireAuth><Layout><WorkoutPlans /></Layout></RequireAuth>} />
      <Route path="/subscriptions" element={<RequireAuth><Layout><Subscriptions /></Layout></RequireAuth>} />
      <Route path="/ems-devices" element={<RequireAuth><Layout><EmsDevices /></Layout></RequireAuth>} />
      <Route path="/trainers" element={<RequireAuth><Layout><Trainers /></Layout></RequireAuth>} />
      <Route path="/live-sessions" element={<RequireAuth><Layout><LiveSessions /></Layout></RequireAuth>} />
      <Route path="/community" element={<RequireAuth><Layout><Community /></Layout></RequireAuth>} />
      <Route path="/notifications" element={<RequireAuth><Layout><Notifications /></Layout></RequireAuth>} />
      <Route path="/gamification" element={<RequireAuth><Layout><Gamification /></Layout></RequireAuth>} />
      <Route path="/analytics" element={<RequireAuth><Layout><Analytics /></Layout></RequireAuth>} />
      <Route path="/advanced-analytics" element={<P title="Advanced Analytics" />} />
      <Route path="/app-access" element={<P title="App Access Tracking" />} />
      <Route path="/monitoring" element={<P title="Real-time Monitoring" />} />
      <Route path="/performance" element={<P title="System Performance" />} />
      <Route path="/api-keys" element={<RequireAuth><Layout><ApiKeys /></Layout></RequireAuth>} />
      <Route path="/webhooks" element={<RequireAuth><Layout><Webhooks /></Layout></RequireAuth>} />
      <Route path="/stripe" element={<P title="Stripe Integration" />} />
      <Route path="/backup" element={<P title="Backup & Restore" />} />
      <Route path="/audit-logs" element={<RequireAuth><Layout><AuditLogs /></Layout></RequireAuth>} />
      <Route path="/security" element={<P title="Security & Compliance" />} />
      <Route path="/settings" element={<P title="Settings" />} />
      <Route path="/advanced-settings" element={<P title="Advanced Settings" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
