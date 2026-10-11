import { useState } from 'react'
import { Link } from 'react-router-dom'
import { apiPost } from '../lib/api'
export default function ForgotPassword(){
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')
  const [loading, setLoading]=useState(false)
  async function onSubmit(e: React.FormEvent){
    e.preventDefault()
    setErr(''); setLoading(true)
    try{
      const r = await apiPost('/auth/forgot-password', { email })
      if(r.ok){ setSent(true) }
      else if(r.status===404){ setErr('Se o email existir, vais receber instruções.') ; setSent(true) }
      else { setErr('Erro ao enviar. Tenta novamente.') }
    } catch { setErr('Erro de rede. Tenta novamente.') }
    finally{ setLoading(false) }
  }
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#fffbf7] px-4">
      <div className="pt-10 pb-6 flex flex-col items-center">
        <div className="w-[72px] h-[72px] bg-[#FF9B22] rounded-md grid place-items-center"><span className="text-white font-black text-[36px] leading-none tracking-tighter">U</span></div>
        <div className="mt-2 text-[#FF9B22] font-bold tracking-widest text-[13px]">TECHBODY</div>
      </div>
      <h1 className="text-[30px] font-bold text-[#0f172a] tracking-tight">Forgot Password</h1>
      <p className="mt-1 text-[14.5px] text-[#64748b] text-center max-w-md">Enter your email and we will send reset instructions if the account exists.</p>
      <form onSubmit={onSubmit} className="mt-10 w-full max-w-[448px] bg-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.08)] border p-8">
        {!sent ? <>
          <label className="block text-[13.5px] font-semibold text-[#0f172a]">Email Address</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Enter your email" required className="mt-2 w-full h-[40px] rounded-md border border-input bg-background px-3 text-[14px] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-ring"/>
          {err && <div className="mt-4 text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{err}</div>}
          <button type="submit" disabled={loading} className="mt-6 w-full h-[44px] rounded-md bg-primary hover:bg-primary/90 text-white font-semibold text-[14px] disabled:opacity-60">{loading?'Sending...':'Send reset link'}</button>
        </> : (
          <div className="text-center py-2">
            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 grid place-items-center mx-auto mb-3 text-xl">✓</div>
            <h3 className="font-semibold">Check your email</h3>
            <p className="text-sm text-gray-600 mt-1">If {email} exists, you will receive a reset link shortly.</p>
          </div>
        )}
        <div className="mt-4 text-center">
          <Link to="/login" className="text-[13.5px] font-medium text-primary hover:text-primary/80">Back to Sign In</Link>
        </div>
      </form>
      <div className="mt-8 mb-6 text-[12.5px] text-[#94a3b8]">© 2026 TechBody Admin Panel. All rights reserved.</div>
    </div>
  )
}
