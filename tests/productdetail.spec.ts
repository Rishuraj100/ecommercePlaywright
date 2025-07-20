import { test, expect } from '@playwright/test';
import { ProductGridPage } from '../pages/ProductGridPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

const BASE_URL = 'https://ecommercepracticeportal.netlify.app/';

test.describe('Product Detail Component', () => {
  test('should display product title, price, and Add to Cart button', async ({ page }) => {
    await page.goto(BASE_URL);
    const productGrid = new ProductGridPage(page);
    await productGrid.getProductCard(0).click();
    const productDetail = new ProductDetailPage(page);
    expect(await productDetail.title.isVisible()).toBeTruthy();
    expect(await productDetail.price.isVisible()).toBeTruthy();
    expect(await productDetail.addToCartButton.isVisible()).toBeTruthy();
  });
}); 