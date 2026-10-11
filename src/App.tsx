import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
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
import AdvancedAnalytics from './pages/AdvancedAnalytics'
import AppAccess from './pages/AppAccess'
import Monitoring from './pages/Monitoring'
import Performance from './pages/Performance'
import AppRegistrations from './pages/AppRegistrations'
import ApiKeys from './pages/ApiKeys'
import Webhooks from './pages/Webhooks'
import StripeIntegration from './pages/StripeIntegration'
import BackupRestore from './pages/BackupRestore'
import UserProfiles from './pages/UserProfiles'
import AuditLogs from './pages/AuditLogs'
import SecurityCompliance from './pages/SecurityCompliance'
import Settings from './pages/Settings'
import AdvancedSettings from './pages/AdvancedSettings'
import Layout from './components/Layout'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('tb_token')
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<RequireAuth><Layout><Dashboard /></Layout></RequireAuth>} />
      <Route path="/dashboard" element={<RequireAuth><Layout><Dashboard /></Layout></RequireAuth>} />
      <Route path="/users" element={<RequireAuth><Layout><Users /></Layout></RequireAuth>} />
      <Route path="/app-registrations" element={<RequireAuth><Layout><AppRegistrations /></Layout></RequireAuth>} />
      <Route path="/user-profiles" element={<RequireAuth><Layout><UserProfiles /></Layout></RequireAuth>} />
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
      <Route path="/advanced-analytics" element={<RequireAuth><Layout><AdvancedAnalytics /></Layout></RequireAuth>} />
      <Route path="/app-access" element={<RequireAuth><Layout><AppAccess /></Layout></RequireAuth>} />
      <Route path="/monitoring" element={<RequireAuth><Layout><Monitoring /></Layout></RequireAuth>} />
      <Route path="/performance" element={<RequireAuth><Layout><Performance /></Layout></RequireAuth>} />
      <Route path="/api-keys" element={<RequireAuth><Layout><ApiKeys /></Layout></RequireAuth>} />
      <Route path="/webhooks" element={<RequireAuth><Layout><Webhooks /></Layout></RequireAuth>} />
      <Route path="/stripe" element={<RequireAuth><Layout><StripeIntegration /></Layout></RequireAuth>} />
      <Route path="/backup" element={<RequireAuth><Layout><BackupRestore /></Layout></RequireAuth>} />
      <Route path="/audit-logs" element={<RequireAuth><Layout><AuditLogs /></Layout></RequireAuth>} />
      <Route path="/security" element={<RequireAuth><Layout><SecurityCompliance /></Layout></RequireAuth>} />
      <Route path="/settings" element={<RequireAuth><Layout><Settings /></Layout></RequireAuth>} />
      <Route path="/advanced-settings" element={<RequireAuth><Layout><AdvancedSettings /></Layout></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
