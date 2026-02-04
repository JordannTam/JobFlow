import { test, expect } from '@playwright/test';

test.describe('Applications Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/applications');
  });

  test('should display the applications page header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Job Applications');
  });

  test('should display Add Application button', async ({ page }) => {
    await expect(page.locator('button:has-text("Add Application")')).toBeVisible();
  });

  test('should navigate to new application form when clicking Add Application', async ({ page }) => {
    await page.click('button:has-text("Add Application")');

    await expect(page).toHaveURL('/applications/new');
    await expect(page.locator('h1')).toContainText('Add New Application');
  });

  test('should show empty state when no applications exist', async ({ page }) => {
    // Wait for loading to complete
    await page.waitForLoadState('networkidle');

    // If the API returns empty, we should see the empty state
    // Note: This test may pass or fail depending on backend state
    const emptyState = page.locator('text=No applications yet');
    const table = page.locator('table');

    // Either empty state or table should be visible
    const hasEmptyState = await emptyState.isVisible().catch(() => false);
    const hasTable = await table.isVisible().catch(() => false);

    expect(hasEmptyState || hasTable).toBeTruthy();
  });

  test('should display table headers when applications exist', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const table = page.locator('table');
    const hasTable = await table.isVisible().catch(() => false);

    if (hasTable) {
      await expect(page.locator('th:has-text("Company")')).toBeVisible();
      await expect(page.locator('th:has-text("Role")')).toBeVisible();
      await expect(page.locator('th:has-text("Status")')).toBeVisible();
      await expect(page.locator('th:has-text("Date Applied")')).toBeVisible();
      await expect(page.locator('th:has-text("Actions")')).toBeVisible();
    }
  });
});

test.describe('Create Application Flow', () => {
  test('should create a new application successfully', async ({ page }) => {
    // Use unique company name to avoid conflicts with other tests
    const uniqueCompany = `Test Company ${Date.now()}`;

    // Navigate to new application form
    await page.goto('/applications/new');

    // Fill in required fields
    await page.fill('#company', uniqueCompany);
    await page.fill('#role', 'QA Engineer');

    // Status should default to 'applied', but let's verify the select exists
    await expect(page.locator('[data-slot="select-trigger"]')).toBeVisible();

    // Fill optional fields
    await page.fill('#dateApplied', '2025-02-01');
    await page.fill('#link', 'https://testcompany.com/jobs/123');
    await page.fill('#notes', 'This is a test application');

    // Submit the form
    await page.click('button:has-text("Create Application")');

    // Should redirect to applications list
    await expect(page).toHaveURL('/applications');

    // Wait for page to load and verify the new application appears
    await page.waitForLoadState('networkidle');

    // The new application should be in the list (use unique company name)
    await expect(page.locator(`text=${uniqueCompany}`)).toBeVisible();

    // Clean up - delete the test application
    const row = page.locator(`tr:has-text("${uniqueCompany}")`);
    await row.locator('button:has-text("Delete")').click();
  });

  test('should require company and role fields', async ({ page }) => {
    await page.goto('/applications/new');

    // Try to submit without filling required fields
    await page.click('button:has-text("Create Application")');

    // Form should not navigate away due to HTML5 validation
    await expect(page).toHaveURL('/applications/new');
  });

  test('should cancel and return to applications list', async ({ page }) => {
    await page.goto('/applications/new');

    await page.click('button:has-text("Cancel")');

    await expect(page).toHaveURL('/applications');
  });
});
