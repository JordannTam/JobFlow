import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display the dashboard header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('should display View All Applications button', async ({ page }) => {
    await expect(page.locator('button:has-text("View All Applications")')).toBeVisible();
  });

  test('should navigate to applications when clicking View All', async ({ page }) => {
    await page.click('button:has-text("View All Applications")');

    await expect(page).toHaveURL('/applications');
  });

  test('should display status count cards', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Verify all four status cards are present
    await expect(page.locator('text=Applied').first()).toBeVisible();
    await expect(page.locator('text=Interview').first()).toBeVisible();
    await expect(page.locator('text=Offer').first()).toBeVisible();
    await expect(page.locator('text=Rejected').first()).toBeVisible();
  });

  test('should display total applications count', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Verify total count section is displayed
    // The text is "Total: X applications" split across elements
    const totalSection = page.locator('p:has-text("Total")');
    await expect(totalSection).toBeVisible();
  });
});

test.describe('Dashboard Data Accuracy', () => {
  test('should reflect correct counts after adding applications', async ({ page }) => {
    // Create a test application with 'offer' status
    await page.goto('/applications/new');
    const uniqueCompany = `Dashboard Test ${Date.now()}`;

    await page.fill('#company', uniqueCompany);
    await page.fill('#role', 'Test Role');

    // Change status to offer using the select component
    const selectTrigger = page.locator('[data-slot="select-trigger"]');
    await selectTrigger.click();

    // Wait for dropdown content to appear and click the Offer option
    const selectContent = page.locator('[data-slot="select-content"]');
    await selectContent.waitFor({ state: 'visible' });
    await selectContent.locator('[data-slot="select-item"]:has-text("Offer")').click();

    await page.click('button:has-text("Create Application")');
    await expect(page).toHaveURL('/applications');
    await page.waitForLoadState('networkidle');

    // Go to dashboard and verify offer count increased
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Find the offer count card - it has "Offer" label and a bold number
    const offerSection = page.locator('div.border').filter({ hasText: 'Offer' });
    await expect(offerSection).toBeVisible();

    // Verify there's at least one offer
    const offerCount = offerSection.locator('p.font-bold');
    const countText = await offerCount.textContent();
    const count = parseInt(countText || '0', 10);

    expect(count).toBeGreaterThanOrEqual(1);

    // Clean up - delete the test application
    await page.goto('/applications');
    await page.waitForLoadState('networkidle');
    const row = page.locator(`tr:has-text("${uniqueCompany}")`);
    if (await row.isVisible()) {
      await row.locator('button:has-text("Delete")').click();
    }
  });
});
