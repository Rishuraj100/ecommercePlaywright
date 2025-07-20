import { test, expect } from '@playwright/test';
import { ProductGridPage } from '../pages/ProductGridPage';
import { ModalPopupPage } from '../pages/ModalPopupPage';

const BASE_URL = 'https://ecommercepracticeportal.netlify.app/';

test.describe('Modal/Popup Component', () => {
  test('should display modal when product is added to cart', async ({ page }) => {
    await page.goto(BASE_URL);
    const productGrid = new ProductGridPage(page);
    await productGrid.addToCart(0);
    const modal = new ModalPopupPage(page);
    expect(await modal.isVisible()).toBeTruthy();
    expect(await modal.getProductInfo()).toBeTruthy();
  });

  test('should close modal when Continue Shopping is clicked', async ({ page }) => {
    await page.goto(BASE_URL);
    const productGrid = new ProductGridPage(page);
    await productGrid.addToCart(0);
    const modal = new ModalPopupPage(page);
    await modal.continueShopping();
    expect(await modal.isVisible()).toBeFalsy();
  });
}); 