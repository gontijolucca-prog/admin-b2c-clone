import { Save, Shield, Database, Sliders, Bell, Zap } from 'lucide-react'
export default function AdvancedSettings(){
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Settings</h1>
          <p className="text-gray-600 mt-1 text-sm">System configuration, feature flags and platform maintenance</p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-6 rounded-md bg-primary hover:bg-primary/90 text-white text-sm font-medium">
          <Save size={16}/> Save All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="font-semibold flex items-center gap-2"><Sliders size={18} className="text-primary"/> General Platform</h3>
          <p className="text-sm text-gray-500 mt-1">Core behaviour and defaults</p>
          <div className="mt-4 space-y-4">
            <div><label className="text-sm font-medium">Maintenance Mode</label><div className="mt-2 flex items-center justify-between rounded-md border p-3 bg-gray-50"><span className="text-sm">Enabled — show maintenance page to all non-admins</span><span className="w-10 h-6 rounded-full bg-gray-300 relative"><span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow"/></span></div></div>
            <div><label className="text-sm font-medium">Default User Role</label><select className="mt-1 w-full h-10 px-3 rounded-md border text-sm bg-white"><option>User</option><option>Admin</option><option>Trainer</option></select></div>
            <div><label className="text-sm font-medium">Support Email</label><input defaultValue="support@techbody.pt" className="mt-1 w-full h-10 px-3 rounded-md border text-sm"/></div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="font-semibold flex items-center gap-2"><Shield size={18} className="text-primary"/> Security & Access</h3>
          <p className="text-sm text-gray-500 mt-1">Authentication and compliance</p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between rounded-md border p-3"><div><p className="text-sm font-medium">Enforce 2FA for admins</p><p className="text-xs text-gray-500">Require TOTP for all admin accounts</p></div><span className="w-10 h-6 rounded-full bg-primary relative"><span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"/></span></div>
            <div className="flex items-center justify-between rounded-md border p-3"><div><p className="text-sm font-medium">Session Timeout</p><p className="text-xs text-gray-500">Auto-logout idle users</p></div><select className="h-9 px-3 rounded-md border text-sm bg-white"><option>30 min</option><option>60 min</option><option>8 hours</option></select></div>
            <div className="flex items-center justify-between rounded-md border p-3"><div><p className="text-sm font-medium">IP Allowlist</p><p className="text-xs text-gray-500">Restrict admin panel to known IPs</p></div><button className="h-8 px-3 rounded-md border text-sm">Configure</button></div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="font-semibold flex items-center gap-2"><Zap size={18} className="text-green-600"/> Feature Flags</h3>
          <p className="text-sm text-gray-500 mt-1">Toggle platform capabilities without deploy</p>
          <div className="mt-4 space-y-3">
            {[
              {k:'EMS Realtime Telemetry', on:true},
              {k:'Live Sessions', on:true},
              {k:'Gamification', on:true},
              {k:'Stripe Checkout', on:false},
              {k:'Community Feed', on:true},
            ].map(f=>(
              <div key={f.k} className="flex items-center justify-between rounded-md border px-3 py-2.5">
                <span className="text-sm font-medium">{f.k}</span>
                <span className={`w-10 h-6 rounded-full relative ${f.on?'bg-primary':'bg-gray-300'}`}><span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow ${f.on?'right-1':'left-1'}`}/></span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="font-semibold flex items-center gap-2"><Database size={18} className="text-blue-600"/> Integrations & Limits</h3>
          <p className="text-sm text-gray-500 mt-1">API, Webhooks and rate limiting</p>
          <div className="mt-4 space-y-4">
            <div><label className="text-sm font-medium">API Rate Limit (req/min)</label><input defaultValue="120" className="mt-1 w-full h-10 px-3 rounded-md border text-sm"/></div>
            <div><label className="text-sm font-medium">Webhook Retry Count</label><select className="mt-1 w-full h-10 px-3 rounded-md border text-sm bg-white"><option>3 retries</option><option>5 retries</option><option>10 retries</option></select></div>
            <div className="flex items-center gap-2"><Bell size={14} className="text-gray-400"/><span className="text-xs text-gray-500">Alerts sent to admin@techbody.pt on failure threshold</span></div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
        <Shield size={18} className="text-amber-600 shrink-0 mt-0.5"/>
        <div><p className="text-sm font-semibold text-amber-900">HttpOnly cookies require backend</p><p className="text-xs text-amber-800 mt-1">Auth uses Secure + SameSite=Lax cookies client-side; para HttpOnly real é preciso o backend setar <code className="bg-white px-1 rounded border">Set-Cookie: HttpOnly</code> em /auth/login.</p></div>
      </div>
    </div>
  )
}
