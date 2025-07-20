import { test, expect } from '@playwright/test';
import { ProductGridPage } from '../pages/ProductGridPage';
import { NavigationBarPage } from '../pages/NavigationBarPage';
import { CartPage } from '../pages/CartPage';

const BASE_URL = 'https://ecommercepracticeportal.netlify.app/';

test.describe('Cart Component', () => {
  test('should add product to cart and display in cart overview', async ({ page }) => {
    await page.goto(BASE_URL);
    const productGrid = new ProductGridPage(page);
    await productGrid.addToCart(0);
    const navBar = new NavigationBarPage(page);
    await navBar.goto('Cart');
    const cart = new CartPage(page);
    expect(await cart.cartItems.first().isVisible()).toBeTruthy();
    expect(await cart.cartTotal.isVisible()).toBeTruthy();
  });
}); 