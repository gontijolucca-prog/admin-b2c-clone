import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import ApiKeys from './pages/ApiKeys'
import Webhooks from './pages/Webhooks'
import Analytics from './pages/Analytics'
import Placeholder from './pages/Placeholder'
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
      <Route path="/app-registrations" element={<P title="App Registrations" />} />
      <Route path="/user-profiles" element={<P title="User Profiles" />} />
      <Route path="/workout-groups" element={<P title="Workout Groups" />} />
      <Route path="/workout-library" element={<P title="Workout Library" />} />
      <Route path="/workout-plans" element={<P title="Workout Plans" />} />
      <Route path="/subscriptions" element={<P title="Subscriptions" />} />
      <Route path="/ems-devices" element={<P title="EMS Devices" />} />
      <Route path="/trainers" element={<P title="Trainers" />} />
      <Route path="/live-sessions" element={<P title="Live Sessions" />} />
      <Route path="/community" element={<P title="Community" />} />
      <Route path="/notifications" element={<P title="Notifications" />} />
      <Route path="/gamification" element={<P title="Gamification" />} />
      <Route path="/analytics" element={<RequireAuth><Layout><Analytics /></Layout></RequireAuth>} />
      <Route path="/advanced-analytics" element={<P title="Advanced Analytics" />} />
      <Route path="/app-access" element={<P title="App Access Tracking" />} />
      <Route path="/monitoring" element={<P title="Real-time Monitoring" />} />
      <Route path="/performance" element={<P title="System Performance" />} />
      <Route path="/api-keys" element={<RequireAuth><Layout><ApiKeys /></Layout></RequireAuth>} />
      <Route path="/webhooks" element={<RequireAuth><Layout><Webhooks /></Layout></RequireAuth>} />
      <Route path="/stripe" element={<P title="Stripe Integration" />} />
      <Route path="/backup" element={<P title="Backup & Restore" />} />
      <Route path="/audit-logs" element={<P title="Audit Logs" />} />
      <Route path="/security" element={<P title="Security & Compliance" />} />
      <Route path="/settings" element={<P title="Settings" />} />
      <Route path="/advanced-settings" element={<P title="Advanced Settings" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
