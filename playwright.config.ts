import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: { baseURL: 'http://localhost:5174', screenshot: 'only-on-failure', trace: 'on-first-retry' },
  webServer: { command: 'npm run build && npx vite preview --port 5174 --host 0.0.0.0', port: 5174, reuseExistingServer: true, timeout: 120000 },
})
