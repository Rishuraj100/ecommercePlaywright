import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     * @param url - The URL to navigate to
     */
    async goto(url: string) {
        await this.page.goto(url);
    }

    /**
     * Wait for page to load completely
     */
    async waitForPageLoad() {
        try {
            // Wait for DOM to be ready
            await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
            
            // Wait for network to be idle with shorter timeout
            await this.page.waitForLoadState('networkidle', { timeout: 15000 });
        } catch (error) {
            // If networkidle times out, just wait for DOM to be ready
            console.log('Network idle timeout, continuing with DOM ready state');
        }
    }

    /**
     * Click on an element
     * @param locator - The locator for the element to click
     */
    async click(locator: Locator) {
        await locator.click();
    }

    /**
     * Fill a form field
     * @param locator - The locator for the input field
     * @param value - The value to fill
     */
    async fill(locator: Locator, value: string) {
        await locator.fill(value);
    }

    /**
     * Type text into a field
     * @param locator - The locator for the input field
     * @param value - The value to type
     */
    async type(locator: Locator, value: string) {
        await locator.type(value);
    }

    /**
     * Get text content of an element
     * @param locator - The locator for the element
     * @returns The text content
     */
    async getText(locator: Locator): Promise<string> {
        return await locator.textContent() || '';
    }

    /**
     * Check if element is visible
     * @param locator - The locator for the element
     * @returns True if element is visible
     */
    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    /**
     * Wait for element to be visible
     * @param locator - The locator for the element
     * @param timeout - Timeout in milliseconds
     */
    async waitForElement(locator: Locator, timeout: number = 5000) {
        await locator.waitFor({ state: 'visible', timeout });
    }

    /**
     * Take a screenshot
     * @param name - Name for the screenshot file
     */
    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `test-results/${name}.png` });
    }

    /**
     * Assert element is visible
     * @param locator - The locator for the element
     */
    async expectElementVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    /**
     * Assert element has text
     * @param locator - The locator for the element
     * @param text - Expected text
     */
    async expectElementText(locator: Locator, text: string) {
        await expect(locator).toHaveText(text);
    }

    /**
     * Assert element contains text
     * @param locator - The locator for the element
     * @param text - Expected text
     */
    async expectElementContainsText(locator: Locator, text: string) {
        await expect(locator).toContainText(text);
    }

    /**
     * Select option from dropdown
     * @param locator - The locator for the select element
     * @param value - The value to select
     */
    async selectOption(locator: Locator, value: string) {
        await locator.selectOption(value);
    }

    /**
     * Check a checkbox
     * @param locator - The locator for the checkbox
     */
    async check(locator: Locator) {
        await locator.check();
    }

    /**
     * Uncheck a checkbox
     * @param locator - The locator for the checkbox
     */
    async uncheck(locator: Locator) {
        await locator.uncheck();
    }

    /**
     * Hover over an element
     * @param locator - The locator for the element
     */
    async hover(locator: Locator) {
        await locator.hover();
    }

    /**
     * Press a key
     * @param key - The key to press
     */
    async pressKey(key: string) {
        await this.page.keyboard.press(key);
    }

    /**
     * Wait for a specific time
     * @param milliseconds - Time to wait in milliseconds
     */
    async wait(milliseconds: number) {
        await this.page.waitForTimeout(milliseconds);
    }
} 