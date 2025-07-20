import { test, expect } from '@playwright/test';
import { SearchBarPage } from '../pages/SearchBarPage';

const BASE_URL = 'https://ecommercepracticeportal.netlify.app/';

test.describe('Search Bar Component', () => {
  test('should return relevant products for a search term', async ({ page }) => {
    await page.goto(BASE_URL);
    const searchBar = new SearchBarPage(page);
    await searchBar.search('T-Shirt');
    expect(await searchBar.isSearchResultVisible('T-Shirt')).toBeTruthy();
  });
}); 