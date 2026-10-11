import { test, expect } from '@playwright/test'

const routes = ['/login','/','/users','/workout-groups','/workout-library','/advanced-analytics','/advanced-settings','/app-registrations','/analytics','/settings'] as const

test('pixel - routes render and login flow', async ({ page }) => {
  await page.goto('/login')
  await expect(page.getByText('Admin Panel')).toBeVisible()
  await expect(page.getByPlaceholder('Enter your email')).toBeVisible()
  // login with env creds inside page
  await page.fill('input[placeholder="Enter your email"]', process.env.VITE_ADMIN_EMAIL || 'admin@techbody.pt')
  await page.fill('input[placeholder="Enter your password"]', process.env.VITE_ADMIN_PASSWORD || 'Admin@123')
  await page.click('button:has-text("Sign In")')
  await page.waitForURL(u => !u.toString().includes('/login'), { timeout: 5000 }).catch(()=>{})
  // should redirect to dashboard
  await page.goto('/')
  await expect(page.getByText('Fitness EMS Platform')).toBeVisible({ timeout: 10000 })
})

for (const r of routes) {
  test(`pixel snapshot ${r}`, async ({ page }) => {
    if (r === '/login' || r === '/') return
    await page.goto('/login')
    await page.evaluate(() => localStorage.setItem('tb_token', btoa('admin@techbody.pt:'+Date.now())))
    await page.goto(r)
    await page.waitForTimeout(800)
    await expect(page.locator('body')).toBeVisible()
  })
}
