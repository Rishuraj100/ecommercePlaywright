import { test, expect } from '@playwright/test';
import { FooterPage } from '../pages/FooterPage';

const BASE_URL = 'https://ecommercepracticeportal.netlify.app/';

test.describe('Footer Component', () => {
  test('should display quick links and contact info', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = new FooterPage(page);
    const quickLinks = await footer.getQuickLinks();
    expect(quickLinks).toEqual(expect.arrayContaining(['Home', 'Products', 'Categories', 'Cart']));
    expect(await footer.getContactInfo()).toContain('Shopping St');
    const legalLinks = await footer.getLegalLinks();
    expect(legalLinks.join(' ')).toMatch(/Privacy Policy|Terms of Service|Shipping Info/);
  });
}); 