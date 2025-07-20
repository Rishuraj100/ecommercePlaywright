import { test, expect } from '@playwright/test';
import { ProductGridPage } from '../pages/ProductGridPage';

const BASE_URL = 'https://ecommercepracticeportal.netlify.app/';

test.describe('Product Grid Component', () => {
  test('should display product cards with name and price', async ({ page }) => {
    await page.goto(BASE_URL);
    const productGrid = new ProductGridPage(page);
    expect(await productGrid.productCards.first().isVisible()).toBeTruthy();
    const info = await productGrid.getProductInfo(0);
    expect(info.name).toBeTruthy();
    expect(info.price).toBeTruthy();
  });

  test('should have Add to Cart button on each product card', async ({ page }) => {
    await page.goto(BASE_URL);
    const productGrid = new ProductGridPage(page);
    expect(await productGrid.getProductCard(0).locator('button', { hasText: 'Add to Cart' }).isVisible()).toBeTruthy();
  });
}); 