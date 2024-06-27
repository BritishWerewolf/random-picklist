# List all recipes.
default:
    just --list --unsorted

# Install dependencies.
[private]
install-deps:
    npm install

# Build and watch.
build-dev: install-deps
    npx vite

# Type-check, compile and minify for production.
build-prod: install-deps
    npx run-p type-check \"build-only {@}\" --

# Build only.
build: install-deps
    npx vite build

# Run unit tests.
test-unit:
    npx vitest

# Run the TypeScript compiler.
type-check:
    npx vue-tsc --build --force

# Check lint issues.
lint:
    npx eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --ignore-path .gitignore

# Fix all lint issues (if possible).
lint-fix:
    npx eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore
