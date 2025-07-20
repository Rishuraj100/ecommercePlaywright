import { Page, Locator } from '@playwright/test';

export class ProductGridPage {
  readonly page: Page;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('.product-card, [data-testid="product-card"]');
  }

  getProductCard(index: number) {
    return this.productCards.nth(index);
  }

  async getProductInfo(index: number) {
    const card = this.getProductCard(index);
    return {
      name: await card.locator('.product-title').innerText(),
      price: await card.locator('.product-price').innerText(),
    };
  }

  async addToCart(index: number) {
    await this.getProductCard(index).locator('button', { hasText: 'Add to Cart' }).click();
  }

  async filterByCategory(category: string) {
    await this.page.click(`text=${category}`);
  }

  async sortBy(option: string) {
    await this.page.selectOption('select#sort', { label: option });
  }
} 