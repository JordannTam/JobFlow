import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the landing page with hero section', async ({ page }) => {
    // Verify page title/brand in navbar
    await expect(page.getByRole('link', { name: 'JobPilot' })).toBeVisible();

    // Verify hero headline (now split across h1 and span)
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toContainText('Land your dream job');
    await expect(heroHeading).toContainText('organized');

    // Verify hero subtitle
    await expect(page.locator('text=Stop juggling spreadsheets')).toBeVisible();
  });

  test('should display feature cards', async ({ page }) => {
    // Verify all three feature cards are visible (use heading role to be specific)
    await expect(page.getByRole('heading', { name: 'Track Applications' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Monitor Progress' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Stay Organized' })).toBeVisible();
  });

  test('should display CTA buttons', async ({ page }) => {
    // Verify primary CTA (contains "Get Started")
    await expect(page.locator('text=Get Started')).toBeVisible();

    // Verify secondary CTA
    await expect(page.locator('text=View Demo')).toBeVisible();
  });

  test('should navigate to applications page when clicking Get Started', async ({ page }) => {
    await page.click('text=Get Started');

    await expect(page).toHaveURL('/applications');
    // Verify we're on the applications page by checking for the Add button
    await expect(page.locator('button:has-text("+ Add")')).toBeVisible();
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

  test('should display testimonials section', async ({ page }) => {
    // Verify testimonials are visible
    await expect(page.locator('text=Loved by job seekers')).toBeVisible();
    await expect(page.locator('text=Sarah M.')).toBeVisible();
    await expect(page.locator('text=James L.')).toBeVisible();
  });
});
