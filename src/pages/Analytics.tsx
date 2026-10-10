export default function Analytics() {
  return (
    <div className="space-y-4">
      <h1 className="text-[22px] font-extrabold text-[#101828]">Analytics</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {k:'Daily Access', v:'2,431'},
          {k:'Retention', v:'68%'},
          {k:'EMS Usage', v:'1,204'},
        ].map(c=>(
          <div key={c.k} className="bg-white rounded-xl border border-[#eef0f3] shadow-sm p-5">
            <div className="text-[12px] font-semibold tracking-wide text-[#667085] uppercase">{c.k}</div>
            <div className="text-[22px] font-extrabold text-[#101828] mt-2">{c.v}</div>
            <div className="mt-2 h-2 rounded-full bg-[#f3f4f6] overflow-hidden"><div className="h-full bg-[#FF9B22] w-[68%]"/></div>
          </div>
        ))}
      </div>
    </div>
  )
}
