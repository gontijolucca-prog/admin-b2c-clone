export default function Subscriptions(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Subscriptions</h1>
      <p className="text-gray-600 text-sm">Manage user subscriptions and billing</p>
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="font-semibold">All Subscriptions (0)</h3>
          <button className="h-9 px-4 rounded-md bg-primary text-white text-sm">Create Subscription</button>
        </div>
        <div className="p-12 text-center text-gray-500">
          <p className="text-sm">No subscriptions found</p>
          <p className="text-xs mt-1">Subscriptions will appear here when users subscribe</p>
        </div>
      </div>
    </div>
  )
}
