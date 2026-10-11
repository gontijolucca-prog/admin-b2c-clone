export default function StripeIntegration(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Stripe Integration</h1><p className="text-gray-600 text-sm">Manage payments and Stripe webhooks</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Connection Status</h3><p className="text-sm text-green-600 mt-2">Connected</p><p className="text-xs text-gray-500">Webhook endpoint active</p></div>
        <div className="bg-white rounded-lg border p-6"><h3 className="font-semibold">Recent Payments</h3><p className="text-sm text-gray-500 mt-2">No recent payments</p></div>
      </div>
    </div>
  )
}
