export default function BackupRestore(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Backup & Restore</h1><p className="text-gray-600 text-sm">Manage platform backups and data recovery</p>
      <div className="bg-white rounded-lg border p-6">
        <div className="flex justify-between items-center"><h3 className="font-semibold">Recent Backups</h3><button className="h-9 px-4 rounded-md bg-primary text-white text-sm">Create Backup</button></div>
        <div className="mt-4 border rounded-lg overflow-hidden">
          <table className="w-full text-sm"><thead className="bg-gray-50 border-b"><tr className="text-xs text-gray-500"><th className="px-4 py-3 text-left">Name</th><th className="px-4 py-3 text-left">Date</th><th className="px-4 py-3 text-left">Size</th><th className="px-4 py-3 text-left">Status</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3">backup-2026-10-11</td><td className="px-4 py-3">11/10/2026</td><td className="px-4 py-3">42 MB</td><td className="px-4 py-3"><span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Completed</span></td></tr></tbody></table>
        </div>
      </div>
    </div>
  )
}
