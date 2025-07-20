import { Page, Locator } from '@playwright/test';

export class ModalPopupPage {
  readonly page: Page;
  readonly modal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator('.modal, [role="dialog"]');
  }

  async isVisible() {
    return await this.modal.isVisible();
  }

  async getProductInfo() {
    return await this.modal.innerText();
  }

  async continueShopping() {
    await this.modal.locator('button:has-text("Continue Shopping")').click();
  }

  async viewCart() {
    await this.modal.locator('button:has-text("View Cart"), a:has-text("View Cart")').click();
  }
} 