import { Page, Locator } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get title() {
    return this.page.locator('.product-title');
  }

  get price() {
    return this.page.locator('.product-price');
  }

  get addToCartButton() {
    return this.page.locator('button', { hasText: 'Add to Cart' });
  }

  async getTitle() {
    return await this.title.innerText();
  }

  async getPrice() {
    return await this.price.innerText();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async getReviews() {
    return await this.page.locator('.review, [data-testid="review"]').allInnerTexts();
  }
} 