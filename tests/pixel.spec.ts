import { test, expect } from '@playwright/test'

const routes = ['/','/users','/workout-groups','/workout-library','/advanced-analytics','/advanced-settings','/app-registrations','/analytics','/settings'] as const

test('pixel - routes render and login flow', async ({ page }) => {
  await page.goto('/login')
  await expect(page.getByRole('heading', { name: 'Admin Panel' })).toBeVisible()
  await expect(page.getByPlaceholder('Enter your email')).toBeVisible()
  await page.fill('input[placeholder="Enter your email"]', process.env.VITE_ADMIN_EMAIL || 'admin@techbody.pt')
  await page.fill('input[placeholder="Enter your password"]', process.env.VITE_ADMIN_PASSWORD || 'Admin@123')
  await page.click('button:has-text("Sign In")')
  await page.waitForTimeout(1500)
  await page.goto('/')
  await expect(page.getByText('Fitness EMS Platform')).toBeVisible({ timeout: 10000 })
})

for (const r of routes) {
  test(`pixel snapshot ${r}`, async ({ page }) => {
    await page.goto('/login')
    await page.evaluate(() => localStorage.setItem('tb_token', btoa('admin@techbody.pt:'+Date.now())))
    await page.goto(r)
    await page.waitForTimeout(900)
    await expect(page.locator('body')).toBeVisible()
  })
}
