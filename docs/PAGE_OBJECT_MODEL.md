# Page Object Model (POM) Pattern

## Overview

The Page Object Model (POM) is a design pattern that creates an object repository for web UI elements. This pattern helps in reducing code duplication and improves test maintenance. In this framework, we have implemented a comprehensive POM pattern with TypeScript and Playwright.

## Architecture

### 1. Base Page Class (`BasePage.ts`)

The `BasePage` class serves as the foundation for all page objects. It provides:

- **Common Actions**: Click, fill, type, select, check, uncheck, hover
- **Wait Operations**: Wait for elements, page load, timeouts
- **Assertions**: Element visibility, text content, form values
- **Utility Methods**: Screenshots, keyboard operations, navigation

```typescript
export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Common methods available to all page objects
    async click(locator: Locator) { /* ... */ }
    async fill(locator: Locator, value: string) { /* ... */ }
    async expectElementVisible(locator: Locator) { /* ... */ }
    // ... more methods
}
```

### 2. Page Objects

Each page in the application has its corresponding page object:

#### HomePage (`HomePage.ts`)
- **Purpose**: Main landing page functionality
- **Key Methods**:
  - `navigateToHome()` - Navigate to home page
  - `searchProduct(term)` - Search for products
  - `navigateToLogin()` - Navigate to login page
  - `addFirstProductToCart()` - Add product to cart
  - `isUserLoggedIn()` - Check login status

#### LoginPage (`LoginPage.ts`)
- **Purpose**: User authentication
- **Key Methods**:
  - `login(email, password)` - Perform login
  - `loginWithTestData()` - Login with predefined data
  - `verifyLoginPageLoaded()` - Verify page elements
  - `getErrorMessage()` - Get error messages

#### RegisterPage (`RegisterPage.ts`)
- **Purpose**: User registration
- **Key Methods**:
  - `registerUser(userData)` - Register new user
  - `registerWithTestData()` - Register with predefined data
  - `fillPersonalInfo()` - Fill personal information
  - `fillPasswordInfo()` - Fill password information

#### ProductPage (`ProductPage.ts`)
- **Purpose**: Product details and actions
- **Key Methods**:
  - `navigateToProduct(productId)` - Navigate to specific product
  - `addToCart()` - Add product to cart
  - `addToWishlist()` - Add to wishlist
  - `writeReview(reviewData)` - Write product review
  - `getProductTitle()` - Get product title
  - `getProductPrice()` - Get product price

#### CartPage (`CartPage.ts`)
- **Purpose**: Shopping cart management
- **Key Methods**:
  - `getCartItemCount()` - Get number of items
  - `updateItemQuantity(index, quantity)` - Update item quantity
  - `removeItem(index)` - Remove item from cart
  - `applyCouponCode(code)` - Apply discount coupon
  - `proceedToCheckout()` - Go to checkout

#### CheckoutPage (`CheckoutPage.ts`)
- **Purpose**: Checkout process
- **Key Methods**:
  - `fillBillingDetails(data)` - Fill billing information
  - `fillShippingDetails(data)` - Fill shipping information
  - `selectShippingMethod(index)` - Choose shipping method
  - `selectPaymentMethod(index)` - Choose payment method
  - `completeGuestCheckout(data)` - Complete checkout process

## Implementation Principles

### 1. Encapsulation
Each page object encapsulates the page's elements and behavior:

```typescript
export class LoginPage extends BasePage {
    // Private locators
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        // Initialize locators
        this.emailInput = page.locator('#input-email');
        this.passwordInput = page.locator('#input-password');
        this.loginButton = page.locator('#button-login');
    }

    // Public methods
    async login(email: string, password: string) {
        await this.fill(this.emailInput, email);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
    }
}
```

### 2. Reusability
Page objects can be reused across multiple tests:

```typescript
test('User can login and add product to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    // Reuse page objects
    await loginPage.login('user@example.com', 'password');
    await homePage.searchProduct('iPhone');
    await productPage.addToCart();
});
```

### 3. Maintainability
When UI elements change, you only need to update the page object:

```typescript
// Before: page.locator('#old-email-input')
// After: page.locator('#new-email-input')
readonly emailInput: Locator = page.locator('#new-email-input');
```

### 4. Test Data Management
Centralized test data through `TestData` class:

```typescript
import { TestData } from '../utils/TestData';

// Use predefined test data
await loginPage.login(TestData.VALID_USER.email, TestData.VALID_USER.password);

// Generate random data
const randomEmail = TestData.getRandomEmail();
```

## Best Practices

### 1. Locator Strategy
Use stable, semantic selectors:

```typescript
// Good - Stable and semantic
readonly emailInput: Locator = page.locator('#input-email');
readonly loginButton: Locator = page.locator('button[type="submit"]');

// Avoid - Fragile selectors
readonly emailInput: Locator = page.locator('input:nth-child(2)');
```

### 2. Method Naming
Use descriptive method names that reflect user actions:

```typescript
// Good - Clear and descriptive
async loginWithValidCredentials() { /* ... */ }
async addProductToCartWithQuantity(quantity: number) { /* ... */ }

// Avoid - Unclear method names
async doLogin() { /* ... */ }
async addToCart() { /* ... */ }
```

### 3. Error Handling
Include proper error handling and validation:

```typescript
async login(email: string, password: string) {
    try {
        await this.fill(this.emailInput, email);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
        await this.waitForPageLoad();
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
}
```

### 4. Documentation
Document all public methods with JSDoc:

```typescript
/**
 * Login with provided credentials
 * @param email - User email address
 * @param password - User password
 * @throws Error if login fails
 */
async login(email: string, password: string) {
    // Implementation
}
```

## Usage Examples

### 1. Simple Test
```typescript
test('User can search for products', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigateToHome();
    await homePage.searchProduct('iPhone');
    
    // Verify search results
    await expect(page).toHaveURL(/.*search.*/);
});
```

### 2. Complex User Journey
```typescript
test('Complete purchase flow', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await homePage.navigateToLogin();
    await loginPage.loginWithTestData();

    // Add product to cart
    await homePage.searchProduct('MacBook');
    await productPage.addToCart();

    // Checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.completeGuestCheckout(billingData);
});
```

### 3. Data-Driven Testing
```typescript
const testUsers = [
    { email: 'user1@example.com', password: 'pass1' },
    { email: 'user2@example.com', password: 'pass2' }
];

for (const user of testUsers) {
    test(`Login with ${user.email}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(user.email, user.password);
        // Verify login success
    });
}
```

## Advanced Patterns

### 1. Page Factory Pattern
```typescript
class PageFactory {
    static createHomePage(page: Page): HomePage {
        return new HomePage(page);
    }
    
    static createLoginPage(page: Page): LoginPage {
        return new LoginPage(page);
    }
}
```

### 2. Component Objects
For reusable UI components:

```typescript
export class HeaderComponent extends BasePage {
    readonly searchInput: Locator;
    readonly cartButton: Locator;
    
    constructor(page: Page) {
        super(page);
        this.searchInput = page.locator('#search-input');
        this.cartButton = page.locator('#cart-button');
    }
    
    async search(term: string) {
        await this.fill(this.searchInput, term);
        await this.pressKey('Enter');
    }
}
```

### 3. Fluent Interface
```typescript
export class LoginPage extends BasePage {
    async withEmail(email: string): LoginPage {
        await this.fill(this.emailInput, email);
        return this;
    }
    
    async withPassword(password: string): LoginPage {
        await this.fill(this.passwordInput, password);
        return this;
    }
    
    async submit(): Promise<void> {
        await this.click(this.loginButton);
    }
}

// Usage
await loginPage
    .withEmail('user@example.com')
    .withPassword('password')
    .submit();
```

## Benefits

1. **Maintainability**: Changes to UI only require updates to page objects
2. **Reusability**: Page objects can be used across multiple tests
3. **Readability**: Tests are more readable and self-documenting
4. **Reliability**: Centralized element locators reduce flaky tests
5. **Scalability**: Easy to add new pages and functionality

## Conclusion

The Page Object Model pattern implemented in this framework provides a robust, maintainable, and scalable approach to web automation testing. By following the principles and best practices outlined in this document, you can create reliable and efficient test suites that are easy to maintain and extend. 