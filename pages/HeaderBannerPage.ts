import { Page, Locator } from '@playwright/test';

export class HeaderBannerPage {
  readonly page: Page;
  readonly banner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.banner = page.locator('header, .banner, .hero');
  }

  async getBannerText() {
    return await this.banner.innerText();
  }

  async clickCTA() {
    await this.banner.locator('text=Shop Now').click();
  }
} 