export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1 text-sm">Manage your {title.toLowerCase()}</p>
      </div>
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary grid place-items-center mx-auto mb-3">•</div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">This section is connected to https://admin-b2c.techbody.pt</p>
          <p className="text-sm text-muted-foreground">Data via API endpoints. Content will mirror the original admin panel.</p>
        </div>
      </div>
    </div>
  )
}
