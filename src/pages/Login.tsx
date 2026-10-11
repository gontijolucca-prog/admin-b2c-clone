import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { setSecureToken } from '../lib/api'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      const envEmail = import.meta.env.VITE_ADMIN_EMAIL
      const envPass = import.meta.env.VITE_ADMIN_PASSWORD
      if (envEmail && envPass && email === envEmail && password === envPass) {
        const token = btoa(`${email}:${Date.now()}`)
        setSecureToken(token)
        localStorage.setItem('tb_user', JSON.stringify({ email }))
        fetch(`${import.meta.env.VITE_API_BASE || 'https://admin-b2c.techbody.pt'}/auth/login`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
          body: JSON.stringify({ email, password }),
        }).catch(() => {})
        nav('/', { replace: true })
        return
      }
      const r = await fetch(`${import.meta.env.VITE_API_BASE || 'https://admin-b2c.techbody.pt'}/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      if (r.ok) {
        let t = ''
        try { const j = await r.json(); t = j.token || j.access_token || '' } catch {}
        if (!t) t = btoa(`${email}:${Date.now()}`)
        setSecureToken(t)
        localStorage.setItem('tb_user', JSON.stringify({ email }))
        nav('/', { replace: true })
      } else {
        setErr('Credenciais inválidas. Verifica email e password.')
      }
    } catch {
      setErr('Erro de rede. Tenta novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#fffbf7] px-4">
      <div className="pt-10 pb-6 flex flex-col items-center">
        <div className="w-[72px] h-[72px] bg-[#FF9B22] rounded-md grid place-items-center">
          <span className="text-white font-black text-[36px] leading-none tracking-tighter">U</span>
        </div>
        <div className="mt-2 text-[#FF9B22] font-bold tracking-widest text-[13px]">TECHBODY</div>
      </div>

      <h1 className="text-[30px] font-bold text-[#0f172a] tracking-tight">Admin Panel</h1>
      <p className="mt-1 text-[14.5px] text-[#64748b]">Welcome back! Please sign in to your account.</p>

      <form onSubmit={onSubmit} className="mt-10 w-full max-w-[448px] bg-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.08)] border p-8">
        <h2 className="text-center text-[22px] font-bold text-[#0f172a]">Sign In</h2>
        <p className="text-center text-[13.5px] text-[#64748b] mt-1">Enter your credentials to access the dashboard</p>

        <label className="block mt-7 text-[13.5px] font-semibold text-[#0f172a]">Email Address</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          className="mt-2 w-full h-[40px] rounded-md border border-input bg-background px-3 text-[14px] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          autoComplete="email"
        />

        <label className="block mt-5 text-[13.5px] font-semibold text-[#0f172a]">Password</label>
        <div className="mt-2 relative">
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={show ? 'text' : 'password'}
            placeholder="Enter your password"
            className="w-full h-[40px] rounded-md border border-input bg-background px-3 pr-10 text-[14px] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-ring"
            autoComplete="current-password"
          />
          <button type="button" onClick={() => setShow(v => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center text-[#64748b] hover:text-[#334155]" aria-label="toggle password">
            {show ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3.5"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a21.3 21.3 0 015.06-6.03M9.53 9.53a3.5 3.5 0 004.95 4.95M14.12 14.12L9.53 9.53"/><path d="M1 1l22 22"/></svg>
            )}
          </button>
        </div>

        {err && <div className="mt-4 text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{err}</div>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full h-[44px] rounded-md bg-primary hover:bg-primary/90 text-white font-semibold text-[14px] transition disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-[13.5px] font-medium text-primary hover:text-primary/80">Forgot your password?</Link>
        </div>
      </form>

      <div className="mt-8 mb-6 text-[12.5px] text-[#94a3b8]">© 2026 TechBody Admin Panel. All rights reserved.</div>
    </div>
  )
}
