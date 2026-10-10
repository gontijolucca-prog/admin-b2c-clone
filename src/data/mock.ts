export const stats = [
  { label: 'Total Users', value: '12,431', delta: '+12%', sub: 'vs last month' },
  { label: 'Active Now', value: '1,204', delta: '+4%', sub: 'last 5 min' },
  { label: 'API Keys', value: '48', delta: '+2', sub: 'this week' },
  { label: 'Webhooks', value: '12', delta: '3 failed', sub: '24h' },
]
export const recentActivities = [
  { id: 1, user: 'admin@techbody.pt', action: 'USER_LOGIN', resource: 'Authentication', time: '2m ago', outcome: 'success' as const },
  { id: 2, user: 'tiago@techbody.pt', action: 'CREATE_API_KEY', resource: 'API Keys', time: '12m ago', outcome: 'success' as const },
  { id: 3, user: 'system', action: 'WEBHOOK_DELIVERY', resource: 'Webhooks', time: '18m ago', outcome: 'failed' as const },
]
