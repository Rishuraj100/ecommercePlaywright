# FashionHub E-commerce Automation Framework

A comprehensive Playwright automation framework for the [FashionHub e-commerce website](https://ecommercepracticeportal.netlify.app/).

## 🚀 Features

- **Complete Page Object Model (POM)** implementation
- **Multi-browser testing** (Chromium, Firefox, WebKit)
- **Mobile responsive testing**
- **Comprehensive test coverage** for all website components
- **Performance and accessibility testing**
- **Cross-browser compatibility testing**
- **Automated test execution scripts**
- **Detailed reporting and screenshots**
- **CI/CD ready configuration**

## 📋 Test Coverage

### Pages Automated
- ✅ **Home Page** - Navigation, search, featured products, newsletter
- ✅ **Login Page** - Authentication, validation, social login
- ✅ **Register Page** - User registration, form validation, password strength
- ✅ **Product Pages** - Product listing, filtering, sorting, details
- ✅ **Cart Page** - Shopping cart management, calculations
- ✅ **Checkout Page** - Complete checkout process, payment methods
- ✅ **Category Pages** - Category browsing, filtering, pagination

### Components Tested
- ✅ **Navigation** - Menu, breadcrumbs, search
- ✅ **Product Management** - Listing, filtering, sorting, pagination
- ✅ **Shopping Cart** - Add/remove items, quantity updates, calculations
- ✅ **User Authentication** - Login, registration, password management
- ✅ **Checkout Process** - Billing, shipping, payment, order confirmation
- ✅ **Responsive Design** - Mobile, tablet, desktop layouts
- ✅ **Performance** - Page load times, optimization
- ✅ **Accessibility** - Form labels, navigation structure
- ✅ **Error Handling** - Validation messages, error states

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd ecommercePlaywright

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🏃‍♂️ Running Tests

### Quick Start
```bash
# Run all tests in headless mode
npm run test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests on specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Using the Test Runner Script
```bash
# Interactive menu
./scripts/run-all-tests.sh

# Quick commands
./scripts/run-all-tests.sh headless    # Run all tests headless
./scripts/run-all-tests.sh headed      # Run all tests headed
./scripts/run-all-tests.sh smoke       # Run smoke tests
./scripts/run-all-tests.sh performance # Run performance tests
./scripts/run-all-tests.sh accessibility # Run accessibility tests
```

### Individual Test Files
```bash
# Run specific test files
npx playwright test tests/fashionhub.spec.ts
npx playwright test tests/comprehensive-fashionhub.spec.ts
npx playwright test tests/home.spec.ts
npx playwright test tests/login.spec.ts
npx playwright test tests/register.spec.ts
```

## 📁 Project Structure

```
ecommercePlaywright/
├── pages/                          # Page Object Models
│   ├── HomePage.ts                 # Home page interactions
│   ├── LoginPage.ts                # Login page interactions
│   ├── RegisterPage.ts             # Registration page interactions
│   ├── ProductPage.ts              # Product pages interactions
│   ├── CartPage.ts                 # Shopping cart interactions
│   ├── CheckoutPage.ts             # Checkout process interactions
│   └── CategoryPage.ts             # Category pages interactions
├── tests/                          # Test files
│   ├── fashionhub.spec.ts          # Basic FashionHub tests
│   ├── comprehensive-fashionhub.spec.ts # Complete test suite
│   ├── home.spec.ts                # Home page tests
│   ├── login.spec.ts               # Login tests
│   ├── register.spec.ts            # Registration tests
│   └── api.spec.ts                 # API tests
├── utils/                          # Utilities and helpers
│   ├── BasePage.ts                 # Base page class
│   ├── TestData.ts                 # Test data management
│   └── TestHelper.ts               # Helper functions
├── scripts/                        # Automation scripts
│   └── run-all-tests.sh            # Test runner script
├── docs/                           # Documentation
│   └── PAGE_OBJECT_MODEL.md        # POM pattern documentation
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## 🧪 Test Categories

### 1. Home Page Tests
- Page loading and navigation
- Search functionality
- Featured products display
- Newsletter subscription
- Social media links
- Footer components

### 2. Authentication Tests
- User registration flow
- Login functionality
- Password validation
- Form error handling
- Social login options

### 3. Product Management Tests
- Product listing and pagination
- Product filtering (category, price, brand, color, size)
- Product sorting (price, name, rating)
- Product detail pages
- Add to cart/wishlist/compare

### 4. Shopping Cart Tests
- Add/remove items
- Quantity updates
- Price calculations
- Discount codes
- Related products

### 5. Checkout Tests
- Complete checkout flow
- Billing information
- Shipping methods
- Payment methods
- Order confirmation

### 6. Responsive Design Tests
- Mobile layout testing
- Tablet layout testing
- Desktop layout testing
- Cross-browser compatibility

### 7. Performance Tests
- Page load times
- Performance optimization
- Resource loading

### 8. Accessibility Tests
- Form accessibility
- Navigation structure
- Screen reader compatibility

## 🔧 Configuration

### Playwright Configuration
The framework is configured in `playwright.config.ts` with:
- Multiple browser support
- Parallel test execution
- Screenshot and video capture
- HTML and JSON reporting
- Retry logic for flaky tests

### Environment Variables
```bash
# Base URL for the website
BASE_URL=https://ecommercepracticeportal.netlify.app

# Test execution mode
HEADLESS=true/false
WORKERS=2
```

## 📊 Test Reports

### HTML Report
```bash
# Generate HTML report
npx playwright show-report
```

### JSON Report
```bash
# Generate JSON report
npx playwright test --reporter=json
```

### JUnit Report
```bash
# Generate JUnit report for CI/CD
npx playwright test --reporter=junit
```

## 🚀 CI/CD Integration

### GitHub Actions Example
```yaml
name: FashionHub E-commerce Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 🐛 Troubleshooting

### Common Issues

1. **Browser Installation**
   ```bash
   npx playwright install
   ```

2. **Permission Issues**
   ```bash
   chmod +x scripts/run-all-tests.sh
   ```

3. **Network Issues**
   - Check internet connection
   - Verify website accessibility
   - Update base URL if needed

4. **Test Failures**
   - Check test data validity
   - Verify element selectors
   - Review error screenshots

### Debug Mode
```bash
# Run tests in debug mode
npx playwright test --debug

# Run specific test in debug mode
npx playwright test --debug tests/fashionhub.spec.ts
```

## 📈 Performance Metrics

The framework includes performance testing for:
- Page load times (< 10 seconds)
- Resource optimization
- Mobile performance
- Cross-browser performance

## 🔒 Security Testing

Security aspects covered:
- Input validation
- XSS prevention
- Form security
- Authentication security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tests
4. Update documentation
5. Submit a pull request

## 📝 Test Data Management

Test data is centralized in `utils/TestData.ts`:
- User credentials
- Product information
- Address data
- Payment information
- Random data generators

## 🎯 Best Practices

1. **Page Object Model**: All page interactions are encapsulated in page objects
2. **Data-Driven Testing**: Test data is separated from test logic
3. **Reusable Components**: Common functionality is abstracted into base classes
4. **Error Handling**: Comprehensive error handling and validation
5. **Reporting**: Detailed test reports with screenshots and videos
6. **Maintainability**: Clean, readable, and maintainable code structure

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review test logs and reports
3. Create an issue in the repository
4. Contact the development team

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Testing! 🎉** 