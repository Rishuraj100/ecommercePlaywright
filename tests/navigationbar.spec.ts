import { test, expect } from '@playwright/test';
import { NavigationBarPage } from '../pages/NavigationBarPage';

const BASE_URL = 'https://ecommercepracticeportal.netlify.app/';

test.describe('Navigation Bar Component', () => {
  test('should display all main navigation links', async ({ page }) => {
    await page.goto(BASE_URL);
    const navBar = new NavigationBarPage(page);
    const navLinks = ['Home', 'Products', 'Categories', 'About', 'Contact', 'Login', 'Sign Up'];
    for (const link of navLinks) {
      expect(await navBar.isLinkVisible(link)).toBeTruthy();
    }
  });

  test('should navigate to Products page when Products link is clicked', async ({ page }) => {
    await page.goto(BASE_URL);
    const navBar = new NavigationBarPage(page);
    await navBar.goto('Products');
    await expect(page).toHaveURL(/.*products.*/);
  });
}); 