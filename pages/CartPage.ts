import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get cartItems() {
    return this.page.locator('.cart-item');
  }

  get cartTotal() {
    return this.page.locator('.cart-total');
  }

  get checkoutButton() {
    return this.page.locator('button, a', { hasText: 'Checkout' });
  }

  async getCartItems() {
    return await this.cartItems.allInnerTexts();
  }

  async updateQuantity(index: number, quantity: number) {
    const item = this.cartItems.nth(index);
    await item.locator('input[type="number"]').fill(quantity.toString());
  }

  async removeItem(index: number) {
    const item = this.cartItems.nth(index);
    await item.locator('button, [aria-label="Remove"], .remove').click();
  }

  async getTotal() {
    return await this.cartTotal.innerText();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
} 