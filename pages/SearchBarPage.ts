import { Page, Locator } from '@playwright/test';

export class SearchBarPage {
  readonly page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[placeholder="Search"]');
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async isSearchResultVisible(term: string) {
    return await this.page.locator('.product-card').filter({ hasText: term }).isVisible();
  }
} 