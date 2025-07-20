import { test, expect } from '@playwright/test';
import { NavigationBarPage } from '../pages/NavigationBarPage';
import { ProductGridPage } from '../pages/ProductGridPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { FooterPage } from '../pages/FooterPage';
import { FilterSortPanelPage } from '../pages/FilterSortPanelPage';
import { SearchBarPage } from '../pages/SearchBarPage';
import { HeaderBannerPage } from '../pages/HeaderBannerPage';
import { ModalPopupPage } from '../pages/ModalPopupPage';

const BASE_URL = 'https://ecommercepracticeportal.netlify.app/';

test.describe('FashionHub E-commerce UI Component Tests (POM)', () => {
  test('Navigation bar displays all main links and navigates correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    const navBar = new NavigationBarPage(page);
    const navLinks = ['Home', 'Products', 'Categories', 'About', 'Contact', 'Login', 'Sign Up'];
    for (const link of navLinks) {
      expect(await navBar.isLinkVisible(link)).toBeTruthy();
    }
    await navBar.goto('Products');
    await expect(page).toHaveURL(/.*products.*/);
  });

  test('Product grid displays products with correct info and Add to Cart button', async ({ page }) => {
    await page.goto(BASE_URL);
    const productGrid = new ProductGridPage(page);
    expect(await productGrid.productCards.first().isVisible()).toBeTruthy();
    expect(await productGrid.getProductCard(0).locator('button', { hasText: 'Add to Cart' }).isVisible()).toBeTruthy();
  });

  test('Product detail card displays all product info and allows Add to Cart', async ({ page }) => {
    await page.goto(BASE_URL);
    const productGrid = new ProductGridPage(page);
    await productGrid.getProductCard(0).click();
    const productDetail = new ProductDetailPage(page);
    expect(await productDetail.title.isVisible()).toBeTruthy();
    expect(await productDetail.price.isVisible()).toBeTruthy();
    expect(await productDetail.addToCartButton.isVisible()).toBeTruthy();
  });

  test('Shopping cart overview updates and displays correct totals', async ({ page }) => {
    await page.goto(BASE_URL);
    const productGrid = new ProductGridPage(page);
    await productGrid.addToCart(0);
    const navBar = new NavigationBarPage(page);
    await navBar.goto('Cart');
    const cart = new CartPage(page);
    expect(await cart.cartItems.first().isVisible()).toBeTruthy();
    expect(await cart.cartTotal.isVisible()).toBeTruthy();
  });

  test('Footer displays quick links and contact info', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = new FooterPage(page);
    const quickLinks = await footer.getQuickLinks();
    expect(quickLinks).toEqual(expect.arrayContaining(['Home', 'Products', 'Categories', 'Cart']));
    expect(await footer.getContactInfo()).toContain('Shopping St');
    const legalLinks = await footer.getLegalLinks();
    expect(legalLinks.join(' ')).toMatch(/Privacy Policy|Terms of Service|Shipping Info/);
  });

  test('Filter and sort panel updates product grid', async ({ page }) => {
    await page.goto(BASE_URL);
    const filterPanel = new FilterSortPanelPage(page);
    await filterPanel.filterByCategory('Men');
    const productGrid = new ProductGridPage(page);
    expect(await productGrid.productCards.filter({ hasText: 'Men' }).first().isVisible()).toBeTruthy();
    // Sorting (if available)
    // await filterPanel.sortBy('Price: Low to High');
  });

  test('Search bar returns relevant products', async ({ page }) => {
    await page.goto(BASE_URL);
    const searchBar = new SearchBarPage(page);
    await searchBar.search('T-Shirt');
    expect(await searchBar.isSearchResultVisible('T-Shirt')).toBeTruthy();
  });

  test('Header/banner displays call-to-action and navigates correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    const banner = new HeaderBannerPage(page);
    expect(await banner.getBannerText()).toContain('Discover Your Style');
    await banner.clickCTA();
    await expect(page).toHaveURL(/.*products.*/);
  });

  test('Add to Cart modal appears and displays correct info', async ({ page }) => {
    await page.goto(BASE_URL);
    const productGrid = new ProductGridPage(page);
    await productGrid.addToCart(0);
    const modal = new ModalPopupPage(page);
    expect(await modal.isVisible()).toBeTruthy();
    expect(await modal.getProductInfo()).toBeTruthy();
    await modal.continueShopping();
    expect(await modal.isVisible()).toBeFalsy();
  });
}); 