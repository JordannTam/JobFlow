import { test, expect } from '@playwright/test';

/**
 * Full CRUD flow tests for job applications.
 * These tests use the Discord-style card layout with detail panel.
 */
test.describe('Application CRUD Operations', () => {
  test('should create, view, edit, and delete an application', async ({ page }) => {
    // Use unique identifiers for this test run
    const uniqueId = Date.now();
    const testCompany = `CRUD Test Corp ${uniqueId}`;
    const testRole = `Developer ${uniqueId}`;
    const updatedRole = `Lead Dev ${uniqueId}`;

    // 1. CREATE - Navigate to form and create new application
    await page.goto('/applications/new');
    await expect(page.locator('h1')).toContainText('Add New Application');

    await page.fill('#company', testCompany);
    await page.fill('#role', testRole);
    await page.fill('#dateApplied', '2025-02-01');
    await page.fill('#link', 'https://e2etest.com/jobs/1');
    await page.fill('#notes', 'E2E test notes - created by Playwright');

    await page.click('button:has-text("Create Application")');

    // Should redirect to applications list
    await expect(page).toHaveURL('/applications');
    await page.waitForLoadState('networkidle');

    // Verify application appears in the card list
    await expect(page.locator(`text=${testCompany}`)).toBeVisible();

    // 2. VIEW - Click on card to view details in right panel
    await page.locator(`button:has-text("${testCompany}")`).click();

    // Verify detail panel shows the application info (use h2 for company, p.text-lg for role)
    await expect(page.locator('h2', { hasText: testCompany })).toBeVisible();
    // Role appears in detail panel as p.text-lg
    await expect(page.locator('.w-7\\/10 p.text-lg', { hasText: testRole })).toBeVisible();

    // 3. EDIT - Click edit button in detail panel
    // Get the Edit button in the detail panel (bottom actions area)
    await page.locator('.w-7\\/10 button:has-text("Edit")').click();

    await expect(page).toHaveURL(/\/applications\/[^/]+\/edit/);
    await expect(page.locator('h1')).toContainText('Edit Application');

    // Verify form is populated with existing data
    await expect(page.locator('#company')).toHaveValue(testCompany);
    await expect(page.locator('#role')).toHaveValue(testRole);

    // Update the role
    await page.fill('#role', updatedRole);

    // Change status to interview using proper select component interaction
    const selectTrigger = page.locator('[data-slot="select-trigger"]');
    await selectTrigger.click();

    const selectContent = page.locator('[data-slot="select-content"]');
    await selectContent.waitFor({ state: 'visible' });
    await selectContent.locator('[data-slot="select-item"]:has-text("Interview")').click();

    await page.click('button:has-text("Update Application")');

    // Should redirect back to applications list
    await expect(page).toHaveURL('/applications');
    await page.waitForLoadState('networkidle');

    // Verify updates appear - click on card to see updated details
    await page.locator(`button:has-text("${testCompany}")`).click();
    // Updated role should appear in the detail panel
    await expect(page.locator('.w-7\\/10 p.text-lg', { hasText: updatedRole })).toBeVisible();

    // 4. DELETE - Click delete button in detail panel
    await page.locator('.w-7\\/10 button:has-text("Delete")').click();

    // Wait for deletion to complete
    await page.waitForLoadState('networkidle');

    // Verify application is removed from card list (check the button card is gone)
    await expect(page.locator(`button:has-text("${testCompany}")`)).not.toBeVisible();
  });
});

test.describe('Edit Application Page', () => {
  test('should show not found for invalid application ID', async ({ page }) => {
    await page.goto('/applications/invalid-id-12345/edit');
    await page.waitForLoadState('networkidle');

    // Should show error or "not found" message
    await expect(page.locator('text=Application not found')).toBeVisible();
  });

  test('should have cancel button that returns to list', async ({ page }) => {
    // Use unique identifier
    const uniqueId = Date.now();
    const testCompany = `CancelTest ${uniqueId}`;

    // First create an application to edit
    await page.goto('/applications/new');
    await page.fill('#company', testCompany);
    await page.fill('#role', 'Test Role');
    await page.click('button:has-text("Create Application")');

    await expect(page).toHaveURL('/applications');
    await page.waitForLoadState('networkidle');

    // Click on the card to select it
    await page.locator(`button:has-text("${testCompany}")`).click();

    // Click edit in detail panel
    await page.locator('.w-7\\/10 button:has-text("Edit")').click();

    // Click cancel
    await page.click('button:has-text("Cancel")');

    await expect(page).toHaveURL('/applications');

    // Clean up - delete the test application
    await page.waitForLoadState('networkidle');
    await page.locator(`button:has-text("${testCompany}")`).click();
    await page.locator('.w-7\\/10 button:has-text("Delete")').click();
  });
});
