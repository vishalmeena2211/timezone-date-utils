# @digistay/date-utils

A comprehensive date and time utility library for both frontend and backend JavaScript/TypeScript applications.

## Quick Links

- [NPM Package](https://www.npmjs.com/package/@digistay/date-utils)
- [GitHub Repository](https://github.com/digistayai/date-utils)
- [Documentation](https://github.com/digistayai/date-utils#readme)

## Installation & Usage

See [README.md](./README.md) for complete documentation.

## Development

### Setup

```bash
pnpm install
```

### Build

```bash
# Build both ESM and CJS versions
pnpm build

# Build ESM only
pnpm build:esm

# Build CJS only
pnpm build:cjs
```

### Testing

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

### Publishing

```bash
# Publish to NPM
npm publish --access public
```

## Module System Support

This package provides both ESM and CJS builds:

- **ESM**: `dist/esm/` - For modern bundlers and Node.js ESM
- **CJS**: `dist/cjs/` - For Node.js CommonJS and older bundlers
- **Types**: `dist/types/` - TypeScript definitions

The package.json `exports` field ensures proper module resolution in all environments.
