import { Page, Locator } from '@playwright/test';

export class FooterPage {
  readonly page: Page;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footer = page.locator('footer');
  }

  get quickLinks() {
    return this.footer.locator('a');
  }

  get contactInfo() {
    return this.footer.locator('text=/\d{3} Shopping St/');
  }

  get legalLinks() {
    return this.footer.locator('a', { hasText: /Privacy Policy|Terms of Service|Shipping Info/ });
  }

  async getQuickLinks() {
    return await this.quickLinks.allInnerTexts();
  }

  async getContactInfo() {
    return await this.contactInfo.innerText();
  }

  async getLegalLinks() {
    return await this.legalLinks.allInnerTexts();
  }
} 