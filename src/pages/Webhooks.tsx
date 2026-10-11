export default function Webhooks() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Webhooks</h1>
      <p className="text-gray-600 -mt-4 text-sm">Manage webhook endpoints and deliveries</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="font-semibold text-gray-900">Endpoints</h3>
          <p className="text-sm text-gray-600 mt-2">https://admin-b2c.techbody.pt/webhooks (logs all em /webhooks/logs/all)</p>
          <div className="mt-4 h-10 rounded-lg bg-gray-50 border grid place-items-center text-sm font-mono text-gray-700">POST /webhooks</div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="font-semibold text-gray-900">Recent Deliveries</h3>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm"><span className="font-medium">user.created</span><span className="text-green-600 font-semibold">200</span></div>
            <div className="flex justify-between text-sm"><span className="font-medium">api_key.revoked</span><span className="text-red-600 font-semibold">500</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
