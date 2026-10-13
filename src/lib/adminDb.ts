import { sb } from './sb'
import { setSecureToken } from './api'

const need = () => { if (!sb) throw new Error('Supabase não configurado'); return sb }

export type Profile = {
  id: string; name: string | null; email: string | null; phone: string | null
  role: string; status: string; source: string; total_points: number
  subscription_tier: string | null; created_at: string; last_login: string | null
}
export type Trainer = { id: number; name: string; email: string | null; phone: string | null; specialization: string | null; rating: number | null; status: string | null }
export type Group = { id: number; name: string; slug: string; description: string | null; thumbnail_url: string | null; is_workout_plan: boolean; order: number }
export type Workout = {
  id: number; title: string; description: string | null; difficulty: string | null; duration_min: number | null
  calories: number | null; points: number; video_url: string | null; thumbnail_url: string | null
  trainer_id: number | null; disabled: boolean; videoless: boolean; views: number; rating: number | null
}
export type Notification = { id: number; title: string; body: string | null; target: string; user_id: string | null; created_at: string }
export type Achievement = { id: number; title: string; description: string | null; points: number; icon: string | null; active: boolean }

export async function getSessionWithRole() {
  const { data } = await need().auth.getSession()
  const s = data.session
  if (!s) return { session: null, profile: null as Profile | null }
  const { data: p } = await need().from('profiles').select('*').eq('id', s.user.id).maybeSingle()
  return { session: s, profile: p as Profile | null }
}

export async function signInAdmin(email: string, password: string) {
  const { error, data } = await need().auth.signInWithPassword({ email: email.trim().toLowerCase(), password })
  if (error) return { error: 'Credenciais inválidas. Verifica email e password.' }
  const { data: p } = await need().from('profiles').select('role,status').eq('id', data.user!.id).maybeSingle()
  if (!p || p.role !== 'admin' || p.status !== 'Active') {
    await need().auth.signOut()
    return { error: 'Esta conta não tem permissão de admin.' }
  }
  if (data.session?.access_token) setSecureToken(data.session.access_token)
  return {}
}
export async function signOutAdmin() { await need().auth.signOut().catch(() => {}) }

export async function listProfiles(): Promise<Profile[]> {
  const { data, error } = await need().from('profiles').select('*').order('created_at', { ascending: false }).limit(1000)
  if (error) throw error
  return (data ?? []) as Profile[]
}
export async function updateProfile(id: string, patch: Partial<Profile>) {
  const { error } = await need().from('profiles').update(patch).eq('id', id)
  if (error) throw error
}
export async function resetPassword(email: string) {
  const { error } = await need().auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/#/login' })
  if (error) throw error
}

export async function listTrainers(): Promise<Trainer[]> {
  const { data, error } = await need().from('trainers').select('*').order('id')
  if (error) throw error
  return (data ?? []) as Trainer[]
}
export async function saveTrainer(t: Partial<Trainer>) {
  if (t.id) { const { error } = await need().from('trainers').update(t).eq('id', t.id); if (error) throw error }
  else { const { error } = await need().from('trainers').insert({ name: t.name ?? '', email: t.email, phone: t.phone, specialization: t.specialization, status: t.status ?? 'Active' }); if (error) throw error }
}
export async function deleteTrainer(id: number) {
  const { error } = await need().from('trainers').delete().eq('id', id)
  if (error) throw error
}

export async function listGroups(): Promise<Group[]> {
  const { data, error } = await need().from('workout_groups').select('*').order('order')
  if (error) throw error
  return (data ?? []) as Group[]
}
export async function saveGroup(g: Partial<Group>) {
  if (g.id) { const { error } = await need().from('workout_groups').update(g).eq('id', g.id); if (error) throw error; return g.id }
  const { data, error } = await need().from('workout_groups').insert({ name: g.name ?? '', slug: g.slug, description: g.description ?? '', is_workout_plan: !!g.is_workout_plan, order: g.order ?? 0 }).select('id').single()
  if (error) throw error
  return data.id as number
}
export async function deleteGroup(id: number) {
  const { error } = await need().from('workout_groups').delete().eq('id', id)
  if (error) throw error
}
export async function countGroupWorkouts(): Promise<Record<number, number>> {
  const { data, error } = await need().from('workout_group_items').select('group_id')
  if (error) throw error
  const counts: Record<number, number> = {}
  for (const r of (data ?? []) as any[]) counts[r.group_id] = (counts[r.group_id] ?? 0) + 1
  return counts
}
export async function setGroupWorkouts(groupId: number, workoutIds: number[]) {
  const sb2 = need()
  const { error } = await sb2.from('workout_group_items').delete().eq('group_id', groupId)
  if (error) throw error
  if (workoutIds.length) {
    const { error: e2 } = await sb2.from('workout_group_items').insert(workoutIds.map(wid => ({ workout_id: wid, group_id: groupId })))
    if (e2) throw e2
  }
}

export async function listWorkouts(): Promise<Workout[]> {
  const { data, error } = await need().from('workouts').select('id,title,description,difficulty,duration_min,calories,points,video_url,thumbnail_url,trainer_id,disabled,videoless,views,rating').order('id')
  if (error) throw error
  return (data ?? []) as Workout[]
}
export async function workloadLinks(): Promise<{ workout_id: number; group_id: number }[]> {
  const { data, error } = await need().from('workout_group_items').select('workout_id,group_id')
  if (error) throw error
  return (data ?? []) as any[]
}
export async function saveWorkout(w: Partial<Workout>, groupIds?: number[]) {
  let id = w.id
  const row: any = {
    title: w.title, description: w.description ?? '', difficulty: w.difficulty ?? null,
    duration_min: w.duration_min ?? null, calories: w.calories ?? null, points: w.points ?? 50,
    video_url: w.video_url ?? null, thumbnail_url: w.thumbnail_url ?? null, trainer_id: w.trainer_id ?? null,
    disabled: !!w.disabled, videoless: !!w.videoless,
  }
  if (id) { const { error } = await need().from('workouts').update(row).eq('id', id); if (error) throw error }
  else {
    const { data, error } = await need().from('workouts').insert(row).select('id').single()
    if (error) throw error
    id = data.id
  }
  if (groupIds) {
    await need().from('workout_group_items').delete().eq('workout_id', id)
    if (groupIds.length) { const { error } = await need().from('workout_group_items').insert(groupIds.map(gid => ({ workout_id: id, group_id: gid }))); if (error) throw error }
  }
  return id
}
export async function deleteWorkout(id: number) {
  const { error } = await need().from('workouts').delete().eq('id', id)
  if (error) throw error
}
export async function uploadThumb(file: File): Promise<string> {
  const path = `thumbnails/custom-${Date.now()}.webp`
  const ext = (file.name.split('.').pop() || 'webp').toLowerCase()
  const finalPath = path.replace(/\.webp$/, `.${ext}`)
  const { error } = await need().storage.from('media').upload(finalPath, file, { upsert: true })
  if (error) throw error
  const { data } = need().storage.from('media').getPublicUrl(finalPath)
  return data.publicUrl
}

export async function listNotifications(): Promise<Notification[]> {
  const { data, error } = await need().from('notifications').select('*').order('created_at', { ascending: false }).limit(200)
  if (error) throw error
  return (data ?? []) as Notification[]
}
export async function createNotification(n: { title: string; body: string; target: 'all' | 'user'; userId?: string | null }, adminId: string) {
  const { error } = await need().from('notifications').insert({ title: n.title, body: n.body, target: n.target, user_id: n.target === 'user' ? n.userId ?? null : null, created_by: adminId })
  if (error) throw error
}
export async function deleteNotification(id: number) {
  const { error } = await need().from('notifications').delete().eq('id', id)
  if (error) throw error
}

export async function listAchievements(): Promise<Achievement[]> {
  const { data, error } = await need().from('achievements').select('*').order('id')
  if (error) throw error
  return (data ?? []) as Achievement[]
}
export async function saveAchievement(a: Partial<Achievement>) {
  if (a.id) { const { error } = await need().from('achievements').update(a).eq('id', a.id); if (error) throw error }
  else {
    const { error } = await need().from('achievements').insert({ title: a.title ?? '', description: a.description ?? '', points: a.points ?? 0, icon: a.icon ?? 'trophy', active: a.active ?? true })
    if (error) throw error
  }
}
export async function deleteAchievement(id: number) {
  const { error } = await need().from('achievements').delete().eq('id', id)
  if (error) throw error
}
export async function adjustPoints(userId: string, delta: number, reason: string, adminId: string) {
  const { error } = await need().from('points_adjustments').insert({ user_id: userId, delta, reason, admin_id: adminId })
  if (error) throw error
  const { data: p } = await need().from('profiles').select('total_points').eq('id', userId).maybeSingle()
  const { error: e2 } = await need().from('profiles').update({ total_points: (p?.total_points ?? 0) + delta }).eq('id', userId)
  if (e2) throw e2
}

export async function dashboardCounts() {
  const sb2 = need()
  const [{ count: users }, { count: workouts }, { count: completionsToday }, completionsSum] = await Promise.all([
    sb2.from('profiles').select('*', { count: 'exact', head: true }),
    sb2.from('workouts').select('*', { count: 'exact', head: true }).eq('disabled', false),
    sb2.from('completions').select('*', { count: 'exact', head: true }).gte('completed_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
    sb2.from('completions').select('points_awarded').limit(5000),
  ])
  const totalPoints = (completionsSum.data ?? []).reduce((a: number, r: any) => a + (r.points_awarded ?? 0), 0)
  return { users: users ?? 0, workouts: workouts ?? 0, completionsToday: completionsToday ?? 0, totalPoints }
}

export type RecentCompletion = {
  id: number; completed_at: string; points_awarded: number
  profile: { id: string; name: string | null; email: string | null } | null
  workout: { id: number; title: string } | null
}
export async function recentCompletions(limit = 6): Promise<RecentCompletion[]> {
  const sb2 = need()
  const { data, error } = await sb2.from('completions')
    .select('id,user_id,workout_id,points_awarded,completed_at')
    .order('completed_at', { ascending: false }).limit(limit)
  if (error) throw error
  const rows = (data ?? []) as any[]
  const uids = [...new Set(rows.map(r => r.user_id))].filter(Boolean)
  const wids = [...new Set(rows.map(r => r.workout_id))].filter(Boolean)
  const [profs, wks] = await Promise.all([
    uids.length ? sb2.from('profiles').select('id,name,email').in('id', uids) : Promise.resolve({ data: [] as any[] }),
    wids.length ? sb2.from('workouts').select('id,title').in('id', wids) : Promise.resolve({ data: [] as any[] }),
  ])
  const pMap = new Map<string, RecentCompletion['profile']>(((profs as any).data ?? []).map((p: any) => [p.id, p as RecentCompletion['profile']]))
  const wMap = new Map<number, RecentCompletion['workout']>(((wks as any).data ?? []).map((w: any) => [w.id, w as RecentCompletion['workout']]))
  return rows.map(r => ({ id: r.id, completed_at: r.completed_at, points_awarded: r.points_awarded, profile: pMap.get(r.user_id) ?? null, workout: wMap.get(r.workout_id) ?? null }))
}
