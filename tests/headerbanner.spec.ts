import { test, expect } from '@playwright/test';
import { HeaderBannerPage } from '../pages/HeaderBannerPage';

const BASE_URL = 'https://ecommercepracticeportal.netlify.app/';

test.describe('Header/Banner Component', () => {
  test('should display banner text and call-to-action', async ({ page }) => {
    await page.goto(BASE_URL);
    const banner = new HeaderBannerPage(page);
    expect(await banner.getBannerText()).toContain('Discover Your Style');
  });

  test('should navigate to products when CTA is clicked', async ({ page }) => {
    await page.goto(BASE_URL);
    const banner = new HeaderBannerPage(page);
    await banner.clickCTA();
    await expect(page).toHaveURL(/.*products.*/);
  });
}); 