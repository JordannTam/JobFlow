import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the landing page with hero section', async ({ page }) => {
    // Verify page title/brand
    await expect(page.locator('text=JobTracker')).toBeVisible();

    // Verify hero headline
    await expect(page.locator('h1')).toContainText('Land your dream job');
    await expect(page.locator('h1')).toContainText('organized');

    // Verify hero subtitle
    await expect(page.locator('text=Stop juggling spreadsheets')).toBeVisible();
  });

  test('should display feature cards', async ({ page }) => {
    // Verify all three feature cards are visible
    await expect(page.locator('text=Track Applications')).toBeVisible();
    await expect(page.locator('text=Monitor Progress')).toBeVisible();
    await expect(page.locator('text=Stay Organized')).toBeVisible();
  });

  test('should display CTA buttons', async ({ page }) => {
    // Verify primary CTA
    await expect(page.locator('text=Get Started')).toBeVisible();

    // Verify secondary CTA
    await expect(page.locator('text=View Demo')).toBeVisible();
  });

  test('should navigate to applications page when clicking Get Started', async ({ page }) => {
    await page.click('text=Get Started');

    await expect(page).toHaveURL('/applications');
    await expect(page.locator('h1')).toContainText('Job Applications');
  });

  test('should navigate to dashboard when clicking View Demo', async ({ page }) => {
    await page.click('text=View Demo');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('should navigate to applications via Sign In', async ({ page }) => {
    await page.click('text=Sign In');

    await expect(page).toHaveURL('/applications');
  });

  test('should navigate to new application from bottom CTA', async ({ page }) => {
    await page.click('text=Add Your First Application');

    await expect(page).toHaveURL('/applications/new');
    await expect(page.locator('h1')).toContainText('Add New Application');
  });

  test('should display footer', async ({ page }) => {
    await expect(page.locator('text=Built by Jordan')).toBeVisible();
  });
});
