export default function Webhooks(){
  return (
    <div className="space-y-6">
      <div className="flex justify-between"><div><h1 className="text-3xl font-bold">Webhooks</h1><p className="text-gray-600 text-sm mt-1">Manage webhook endpoints and deliveries</p></div><button className="h-9 px-4 rounded-md bg-primary text-white text-sm">Add Endpoint</button></div>
      <div className="bg-white rounded-lg border shadow-sm p-6"><h3 className="font-semibold">Endpoints</h3><p className="text-sm text-gray-500 mt-2">No webhook endpoints configured</p><div className="mt-4 p-4 bg-gray-50 rounded-lg border text-sm font-mono">https://admin-b2c.techbody.pt/webhooks</div></div>
      <div className="bg-white rounded-lg border shadow-sm p-6"><h3 className="font-semibold">Recent Deliveries</h3><div className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><span>user.created</span><span className="text-green-600">200</span></div><div className="flex justify-between"><span>stripe.payment</span><span className="text-green-600">200</span></div></div></div>
    </div>
  )
}
