import { Page, Locator } from '@playwright/test';

export class FilterSortPanelPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get categoryButtons() {
    return this.page.locator('button, a', { hasText: /Men|Women|Footwear|Accessories|Kids/ });
  }

  async filterByCategory(category: string) {
    await this.page.click(`text=${category}`);
  }

  async sortBy(option: string) {
    await this.page.selectOption('select#sort', { label: option });
  }

  async clearFilters() {
    await this.page.click('button:has-text("Clear")');
  }
} 