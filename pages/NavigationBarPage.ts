import { Page, Locator } from '@playwright/test';

export class NavigationBarPage {
  readonly page: Page;
  readonly nav: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = page.locator('nav');
  }

  link(linkName: string) {
    return this.nav.locator(`text=${linkName}`);
  }

  async goto(linkName: string) {
    await this.link(linkName).click();
  }

  async isLinkVisible(linkName: string) {
    return await this.link(linkName).isVisible();
  }

  async getActiveLink() {
    // Assumes active link has a class or attribute, adjust as needed
    return await this.nav.locator('.active, [aria-current="page"]').innerText();
  }
} 