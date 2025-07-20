export class TestData {
    // User credentials
    static readonly VALID_USER = {
        email: 'test@example.com',
        password: 'test123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890'
    };

    static readonly INVALID_USER = {
        email: 'invalid@example.com',
        password: 'wrongpassword'
    };

    // Product data for FashionHub
    static readonly PRODUCT_DATA = {
        searchTerm: 'shirt',
        category: 'Men',
        brand: 'FashionHub',
        productName: 'Blue Denim Shirt'
    };

    // Address data
    static readonly ADDRESS_DATA = {
        firstName: 'John',
        lastName: 'Doe',
        company: 'Test Company',
        address1: '123 Test Street',
        address2: 'Apt 4B',
        city: 'Test City',
        postcode: '12345',
        country: 'United States',
        region: 'California'
    };

    // Payment data
    static readonly PAYMENT_DATA = {
        cardNumber: '4111111111111111',
        cardholderName: 'John Doe',
        expiryMonth: '12',
        expiryYear: '2025',
        cvv: '123'
    };

    // Random data generators
    static getRandomEmail(): string {
        const timestamp = Date.now();
        return `test${timestamp}@example.com`;
    }

    static getRandomString(length: number = 8): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    static getRandomNumber(min: number = 1000, max: number = 9999): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // URLs for FashionHub
    static readonly URLS = {
        HOME: '/',
        LOGIN: '/login',
        REGISTER: '/register',
        CART: '/cart',
        CHECKOUT: '/checkout',
        ACCOUNT: '/account',
        SEARCH: '/search',
        PRODUCTS: '/products',
        CATEGORIES: '/categories'
    };

    // Timeouts
    static readonly TIMEOUTS = {
        SHORT: 2000,
        MEDIUM: 5000,
        LONG: 10000,
        VERY_LONG: 30000
    };

    // Messages for FashionHub
    static readonly MESSAGES = {
        LOGIN_SUCCESS: 'Welcome',
        LOGIN_ERROR: 'Invalid credentials',
        REGISTER_SUCCESS: 'Account created successfully',
        ADD_TO_CART_SUCCESS: 'Added to cart',
        REMOVE_FROM_CART_SUCCESS: 'Removed from cart',
        ORDER_SUCCESS: 'Order placed successfully'
    };

    // FashionHub specific data
    static readonly FASHION_DATA = {
        categories: ['Men', 'Women', 'Kids', 'Accessories'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Red', 'Blue', 'Green', 'Black', 'White'],
        brands: ['FashionHub', 'StyleCo', 'TrendyWear', 'UrbanStyle']
    };
} 