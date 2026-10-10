import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('admin@techbody.pt')
  const [password, setPassword] = useState('Admin@123')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const nav = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      const expectedEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@techbody.pt'
      const expectedPass = import.meta.env.VITE_ADMIN_PASSWORD || 'Admin@123'
      if (email === expectedEmail && password === expectedPass) {
        const token = btoa(`${email}:${Date.now()}`)
        localStorage.setItem('tb_token', token)
        localStorage.setItem('tb_user', JSON.stringify({ email }))
        // also try real API (fire and forget)
        fetch(`${import.meta.env.VITE_API_BASE || 'https://admin-b2c.techbody.pt'}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }).catch(() => {})
        nav('/', { replace: true })
        return
      }
      // fallback to real API if env check fails
      const r = await fetch(`${import.meta.env.VITE_API_BASE || 'https://admin-b2c.techbody.pt'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (r.ok) {
        const token = btoa(`${email}:${Date.now()}`)
        localStorage.setItem('tb_token', token)
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
    <div className="min-h-screen flex flex-col items-center bg-[#fffaf5] px-4">
      <div className="pt-10 pb-8 flex flex-col items-center">
        <div className="w-[72px] h-[72px] bg-[#FF9B22] flex items-center justify-center rounded-[6px]">
          <span className="text-white font-black text-[36px] leading-none tracking-tighter">U</span>
        </div>
        <div className="mt-3 text-[#FF9B22] font-extrabold tracking-widest text-[13px]">TECHBODY</div>
      </div>

      <h1 className="text-[28px] font-extrabold text-[#101828] tracking-tight">Admin Panel</h1>
      <p className="mt-2 text-[14.5px] text-[#667085]">Welcome back! Please sign in to your account.</p>

      <form onSubmit={onSubmit} className="mt-8 w-full max-w-[420px] bg-white rounded-[14px] shadow-[0_8px_32px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.06)] border border-[#f3f4f6] p-[28px]">
        <h2 className="text-center text-[20px] font-extrabold text-[#101828]">Sign In</h2>
        <p className="text-center text-[13px] text-[#667085] mt-1">Enter your credentials to access the dashboard</p>

        <label className="block mt-6 text-[13px] font-semibold text-[#101828]">Email Address</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="admin@techbody.pt"
          className="mt-2 w-full h-[44px] rounded-[10px] border border-[#e5e7eb] px-3.5 text-[14px] text-[#101828] placeholder:text-[#9aa0a6] focus:outline-none focus:ring-2 focus:ring-[#FF9B22]/30 focus:border-[#FF9B22] bg-white"
        />

        <label className="block mt-5 text-[13px] font-semibold text-[#101828]">Password</label>
        <div className="mt-2 relative">
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={show ? 'text' : 'password'}
            placeholder="••••••••"
            className="w-full h-[44px] rounded-[10px] border border-[#e5e7eb] px-3.5 pr-10 text-[14px] text-[#101828] placeholder:text-[#9aa0a6] focus:outline-none focus:ring-2 focus:ring-[#FF9B22]/30 focus:border-[#FF9B22] bg-white"
          />
          <button type="button" onClick={() => setShow(v => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center text-[#98a1b0] hover:text-[#667085]" aria-label="toggle password">
            {show ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3.5"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a21.3 21.3 0 015.06-6.03M9.53 9.53a3.5 3.5 0 004.95 4.95M14.12 14.12L9.53 9.53"/><path d="M1 1l22 22"/><path d="M10.58 10.58a2 2 0 002.83 2.83"/></svg>
            )}
          </button>
        </div>

        {err && <div className="mt-3 text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</div>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full h-[44px] rounded-[10px] bg-[#FF9B22] hover:bg-[#e68a1e] text-white font-semibold text-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>

        <div className="mt-4 text-center">
          <a href="#" onClick={e => e.preventDefault()} className="text-[13px] font-semibold text-[#FF9B22] hover:text-[#e68a1e]">Forgot your password?</a>
        </div>
      </form>

      <div className="mt-10 mb-6 text-[12.5px] text-[#98a1b0]">© 2026 TechBody Admin Panel. All rights reserved.</div>
    </div>
  )
}
