import { Page, expect } from '@playwright/test';
import { TestData } from './TestData';

export class TestHelper {
    /**
     * Wait for page to be fully loaded
     * @param page - Playwright page object
     */
    static async waitForPageLoad(page: Page) {
        await page.waitForLoadState('networkidle');
    }

    /**
     * Take a screenshot with timestamp
     * @param page - Playwright page object
     * @param name - Screenshot name
     */
    static async takeScreenshot(page: Page, name: string) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await page.screenshot({ path: `test-results/${name}-${timestamp}.png` });
    }

    /**
     * Generate random string
     * @param length - Length of the string
     * @returns Random string
     */
    static generateRandomString(length: number = 8): string {
        return TestData.getRandomString(length);
    }

    /**
     * Generate random email
     * @returns Random email
     */
    static generateRandomEmail(): string {
        return TestData.getRandomEmail();
    }

    /**
     * Generate random number
     * @param min - Minimum value
     * @param max - Maximum value
     * @returns Random number
     */
    static generateRandomNumber(min: number = 1000, max: number = 9999): number {
        return TestData.getRandomNumber(min, max);
    }

    /**
     * Assert URL contains specific text
     * @param page - Playwright page object
     * @param expectedText - Expected text in URL
     */
    static async assertUrlContains(page: Page, expectedText: string) {
        await expect(page).toHaveURL(new RegExp(expectedText));
    }

    /**
     * Assert page title contains specific text
     * @param page - Playwright page object
     * @param expectedText - Expected text in title
     */
    static async assertTitleContains(page: Page, expectedText: string) {
        await expect(page).toHaveTitle(new RegExp(expectedText));
    }

    /**
     * Assert element is visible and has text
     * @param page - Playwright page object
     * @param selector - Element selector
     * @param expectedText - Expected text
     */
    static async assertElementVisibleWithText(page: Page, selector: string, expectedText: string) {
        const element = page.locator(selector);
        await expect(element).toBeVisible();
        await expect(element).toHaveText(expectedText);
    }

    /**
     * Assert element contains text
     * @param page - Playwright page object
     * @param selector - Element selector
     * @param expectedText - Expected text
     */
    static async assertElementContainsText(page: Page, selector: string, expectedText: string) {
        const element = page.locator(selector);
        await expect(element).toContainText(expectedText);
    }

    /**
     * Wait for element to be visible
     * @param page - Playwright page object
     * @param selector - Element selector
     * @param timeout - Timeout in milliseconds
     */
    static async waitForElement(page: Page, selector: string, timeout: number = 5000) {
        const element = page.locator(selector);
        await element.waitFor({ state: 'visible', timeout });
    }

    /**
     * Wait for element to be hidden
     * @param page - Playwright page object
     * @param selector - Element selector
     * @param timeout - Timeout in milliseconds
     */
    static async waitForElementHidden(page: Page, selector: string, timeout: number = 5000) {
        const element = page.locator(selector);
        await element.waitFor({ state: 'hidden', timeout });
    }

    /**
     * Check if element exists
     * @param page - Playwright page object
     * @param selector - Element selector
     * @returns True if element exists
     */
    static async elementExists(page: Page, selector: string): Promise<boolean> {
        const element = page.locator(selector);
        return await element.count() > 0;
    }

    /**
     * Check if element is visible
     * @param page - Playwright page object
     * @param selector - Element selector
     * @returns True if element is visible
     */
    static async elementIsVisible(page: Page, selector: string): Promise<boolean> {
        const element = page.locator(selector);
        return await element.isVisible();
    }

    /**
     * Get element text
     * @param page - Playwright page object
     * @param selector - Element selector
     * @returns Element text
     */
    static async getElementText(page: Page, selector: string): Promise<string> {
        const element = page.locator(selector);
        return await element.textContent() || '';
    }

    /**
     * Get element attribute value
     * @param page - Playwright page object
     * @param selector - Element selector
     * @param attribute - Attribute name
     * @returns Attribute value
     */
    static async getElementAttribute(page: Page, selector: string, attribute: string): Promise<string> {
        const element = page.locator(selector);
        return await element.getAttribute(attribute) || '';
    }

    /**
     * Fill form field
     * @param page - Playwright page object
     * @param selector - Element selector
     * @param value - Value to fill
     */
    static async fillField(page: Page, selector: string, value: string) {
        const element = page.locator(selector);
        await element.fill(value);
    }

    /**
     * Click element
     * @param page - Playwright page object
     * @param selector - Element selector
     */
    static async clickElement(page: Page, selector: string) {
        const element = page.locator(selector);
        await element.click();
    }

    /**
     * Select option from dropdown
     * @param page - Playwright page object
     * @param selector - Element selector
     * @param value - Value to select
     */
    static async selectOption(page: Page, selector: string, value: string) {
        const element = page.locator(selector);
        await element.selectOption(value);
    }

    /**
     * Check checkbox
     * @param page - Playwright page object
     * @param selector - Element selector
     */
    static async checkCheckbox(page: Page, selector: string) {
        const element = page.locator(selector);
        await element.check();
    }

    /**
     * Uncheck checkbox
     * @param page - Playwright page object
     * @param selector - Element selector
     */
    static async uncheckCheckbox(page: Page, selector: string) {
        const element = page.locator(selector);
        await element.uncheck();
    }

    /**
     * Hover over element
     * @param page - Playwright page object
     * @param selector - Element selector
     */
    static async hoverElement(page: Page, selector: string) {
        const element = page.locator(selector);
        await element.hover();
    }

    /**
     * Press key
     * @param page - Playwright page object
     * @param key - Key to press
     */
    static async pressKey(page: Page, key: string) {
        await page.keyboard.press(key);
    }

    /**
     * Wait for specific time
     * @param page - Playwright page object
     * @param milliseconds - Time to wait in milliseconds
     */
    static async wait(page: Page, milliseconds: number) {
        await page.waitForTimeout(milliseconds);
    }

    /**
     * Assert form field value
     * @param page - Playwright page object
     * @param selector - Element selector
     * @param expectedValue - Expected value
     */
    static async assertFieldValue(page: Page, selector: string, expectedValue: string) {
        const element = page.locator(selector);
        await expect(element).toHaveValue(expectedValue);
    }

    /**
     * Assert checkbox is checked
     * @param page - Playwright page object
     * @param selector - Element selector
     */
    static async assertCheckboxChecked(page: Page, selector: string) {
        const element = page.locator(selector);
        await expect(element).toBeChecked();
    }

    /**
     * Assert checkbox is unchecked
     * @param page - Playwright page object
     * @param selector - Element selector
     */
    static async assertCheckboxUnchecked(page: Page, selector: string) {
        const element = page.locator(selector);
        await expect(element).not.toBeChecked();
    }
} 