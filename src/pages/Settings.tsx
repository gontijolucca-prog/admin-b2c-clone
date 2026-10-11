export default function Settings(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1><p className="text-gray-600 text-sm">Manage platform settings and configurations</p>
      <div className="bg-white rounded-lg border shadow-sm p-6 space-y-4">
        <div><h3 className="font-semibold">General Settings</h3><p className="text-sm text-gray-500">Configure general platform preferences</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div><label className="text-sm font-medium">Platform Name</label><input defaultValue="TechBody" className="mt-1 w-full h-10 px-3 rounded-md border text-sm"/></div>
          <div><label className="text-sm font-medium">Support Email</label><input defaultValue="support@techbody.pt" className="mt-1 w-full h-10 px-3 rounded-md border text-sm"/></div>
        </div>
        <button className="h-9 px-6 rounded-md bg-primary text-white text-sm">Save Changes</button>
      </div>
    </div>
  )
}
