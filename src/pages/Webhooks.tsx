export default function Webhooks() {
  return (
    <div className="space-y-4">
      <h1 className="text-[22px] font-extrabold text-[#101828]">Webhooks</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-[#eef0f3] shadow-sm p-5">
          <div className="font-semibold text-[#101828]">Endpoints</div>
          <div className="mt-3 text-[13px] text-[#667085]">https://admin-b2c.techbody.pt/webhooks (logs all em /webhooks/logs/all)</div>
          <div className="mt-3 h-10 rounded-lg bg-[#f9fafb] border border-[#eef0f3] grid place-items-center text-[13px] font-mono text-[#344054]">POST /webhooks</div>
        </div>
        <div className="bg-white rounded-xl border border-[#eef0f3] shadow-sm p-5">
          <div className="font-semibold text-[#101828]">Recent Deliveries</div>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-[13px]"><span className="text-[#101828] font-medium">user.created</span><span className="text-[#027a48] font-semibold">200</span></div>
            <div className="flex justify-between text-[13px]"><span className="text-[#101828] font-medium">api_key.revoked</span><span className="text-[#b42318] font-semibold">500</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
