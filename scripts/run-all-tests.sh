#!/bin/bash

# FashionHub E-commerce Test Runner
# This script runs all Playwright tests for the FashionHub website

echo "🚀 Starting FashionHub E-commerce Test Suite"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Check if Playwright is installed
if [ ! -d "node_modules/@playwright" ]; then
    print_warning "Playwright is not installed. Installing now..."
    npm install
    npx playwright install
fi

# Function to run tests with specific configuration
run_tests() {
    local test_type=$1
    local browser=$2
    local headless=$3
    local workers=$4
    
    print_status "Running $test_type tests on $browser (headless: $headless, workers: $workers)"
    
    # Set environment variables
    export HEADLESS=$headless
    export WORKERS=$workers
    
    # Run tests
    if [ "$browser" = "all" ]; then
        npx playwright test --project=chromium --project=firefox --project=webkit --workers=$workers
    else
        npx playwright test --project=$browser --workers=$workers
    fi
    
    # Check exit code
    if [ $? -eq 0 ]; then
        print_success "$test_type tests completed successfully on $browser"
    else
        print_error "$test_type tests failed on $browser"
        return 1
    fi
}

# Function to run specific test file
run_specific_test() {
    local test_file=$1
    local browser=$2
    
    print_status "Running specific test: $test_file on $browser"
    
    if [ "$browser" = "all" ]; then
        npx playwright test $test_file --project=chromium --project=firefox --project=webkit
    else
        npx playwright test $test_file --project=$browser
    fi
    
    if [ $? -eq 0 ]; then
        print_success "Test $test_file completed successfully on $browser"
    else
        print_error "Test $test_file failed on $browser"
        return 1
    fi
}

# Function to show test report
show_report() {
    print_status "Opening test report..."
    npx playwright show-report
}

# Function to clean test results
clean_results() {
    print_status "Cleaning test results..."
    rm -rf test-results/
    rm -rf playwright-report/
    print_success "Test results cleaned"
}

# Main menu
show_menu() {
    echo ""
    echo "FashionHub Test Runner Menu"
    echo "=========================="
    echo "1. Run all tests (headless)"
    echo "2. Run all tests (headed)"
    echo "3. Run tests on specific browser"
    echo "4. Run specific test file"
    echo "5. Run smoke tests"
    echo "6. Run performance tests"
    echo "7. Run accessibility tests"
    echo "8. Show test report"
    echo "9. Clean test results"
    echo "10. Install dependencies"
    echo "0. Exit"
    echo ""
}

# Smoke tests (quick tests)
run_smoke_tests() {
    print_status "Running smoke tests..."
    npx playwright test tests/fashionhub.spec.ts --grep "should load FashionHub home page successfully" --project=chromium
    npx playwright test tests/fashionhub.spec.ts --grep "should navigate to login page" --project=chromium
    npx playwright test tests/fashionhub.spec.ts --grep "should search for products" --project=chromium
}

# Performance tests
run_performance_tests() {
    print_status "Running performance tests..."
    npx playwright test tests/fashionhub.spec.ts --grep "should load home page within acceptable time" --project=chromium
    npx playwright test tests/fashionhub.spec.ts --grep "should load login page within acceptable time" --project=chromium
}

# Accessibility tests
run_accessibility_tests() {
    print_status "Running accessibility tests..."
    npx playwright test tests/fashionhub.spec.ts --grep "should have proper form accessibility" --project=chromium
    npx playwright test tests/fashionhub.spec.ts --grep "should have proper navigation structure" --project=chromium
}

# Main execution
main() {
    while true; do
        show_menu
        read -p "Enter your choice (0-10): " choice
        
        case $choice in
            1)
                print_status "Running all tests in headless mode..."
                run_tests "All" "all" "true" "2"
                ;;
            2)
                print_status "Running all tests in headed mode..."
                run_tests "All" "all" "false" "1"
                ;;
            3)
                echo "Select browser:"
                echo "1. Chromium"
                echo "2. Firefox"
                echo "3. WebKit"
                echo "4. All browsers"
                read -p "Enter browser choice (1-4): " browser_choice
                
                case $browser_choice in
                    1) browser="chromium" ;;
                    2) browser="firefox" ;;
                    3) browser="webkit" ;;
                    4) browser="all" ;;
                    *) print_error "Invalid choice"; continue ;;
                esac
                
                run_tests "All" "$browser" "true" "2"
                ;;
            4)
                echo "Available test files:"
                echo "1. fashionhub.spec.ts (Basic tests)"
                echo "2. comprehensive-fashionhub.spec.ts (Full test suite)"
                echo "3. home.spec.ts (Home page tests)"
                echo "4. login.spec.ts (Login tests)"
                echo "5. register.spec.ts (Registration tests)"
                echo "6. api.spec.ts (API tests)"
                read -p "Enter test file choice (1-6): " file_choice
                
                case $file_choice in
                    1) test_file="tests/fashionhub.spec.ts" ;;
                    2) test_file="tests/comprehensive-fashionhub.spec.ts" ;;
                    3) test_file="tests/home.spec.ts" ;;
                    4) test_file="tests/login.spec.ts" ;;
                    5) test_file="tests/register.spec.ts" ;;
                    6) test_file="tests/api.spec.ts" ;;
                    *) print_error "Invalid choice"; continue ;;
                esac
                
                run_specific_test "$test_file" "chromium"
                ;;
            5)
                run_smoke_tests
                ;;
            6)
                run_performance_tests
                ;;
            7)
                run_accessibility_tests
                ;;
            8)
                show_report
                ;;
            9)
                clean_results
                ;;
            10)
                print_status "Installing dependencies..."
                npm install
                npx playwright install
                print_success "Dependencies installed"
                ;;
            0)
                print_status "Exiting test runner..."
                exit 0
                ;;
            *)
                print_error "Invalid choice. Please enter a number between 0 and 10."
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
    done
}

# Check if script is run with arguments
if [ $# -gt 0 ]; then
    case $1 in
        "headless")
            run_tests "All" "all" "true" "2"
            ;;
        "headed")
            run_tests "All" "all" "false" "1"
            ;;
        "smoke")
            run_smoke_tests
            ;;
        "performance")
            run_performance_tests
            ;;
        "accessibility")
            run_accessibility_tests
            ;;
        "report")
            show_report
            ;;
        "clean")
            clean_results
            ;;
        "install")
            npm install
            npx playwright install
            ;;
        *)
            print_error "Invalid argument. Usage: $0 [headless|headed|smoke|performance|accessibility|report|clean|install]"
            exit 1
            ;;
    esac
else
    # Run interactive menu
    main
fi 