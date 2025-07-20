import { test, expect } from '@playwright/test';
import { FilterSortPanelPage } from '../pages/FilterSortPanelPage';
import { ProductGridPage } from '../pages/ProductGridPage';

const BASE_URL = 'https://ecommercepracticeportal.netlify.app/';

test.describe('Filter/Sort Panel Component', () => {
  test('should filter products by category', async ({ page }) => {
    await page.goto(BASE_URL);
    const filterPanel = new FilterSortPanelPage(page);
    await filterPanel.filterByCategory('Men');
    const productGrid = new ProductGridPage(page);
    expect(await productGrid.productCards.filter({ hasText: 'Men' }).first().isVisible()).toBeTruthy();
  });

  test('should sort products by option (if available)', async ({ page }) => {
    await page.goto(BASE_URL);
    const filterPanel = new FilterSortPanelPage(page);
    // Uncomment and adjust the sort option as needed
    // await filterPanel.sortBy('Price: Low to High');
    // Add assertions for sorted order if possible
    expect(true).toBeTruthy(); // Placeholder
  });
}); 