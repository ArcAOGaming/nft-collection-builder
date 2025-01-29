# TypeScript NPM Package Template
[![license](https://img.shields.io/npm/l/your-package-name)](LICENSE)

A template for creating and publishing TypeScript npm packages with automated GitHub workflows.

## Features
- TypeScript configuration
- Jest testing setup
- Automated npm publishing
- GitHub Actions workflows
- Environment variable support
- Comprehensive documentation

## Getting Started

1. Use this template by clicking "Use this template" on GitHub
2. Clone your new repository
3. Update the package name in `package.json`
4. Set up GitHub repository secrets:
   - `NPM_TOKEN`: Your npm access token for publishing
   - Add any other secrets your package needs

## Installation
```bash
npm install your-package-name
```

## Usage
```typescript
import { yourFunction } from "your-package-name";

// Add usage examples here
```

## Development
See the [development guide](docs/development.md) for detailed instructions on:
- Setting up your development environment
- Building the project
- Running tests

## Environment Variables
See the [environment documentation](docs/environment.md) for details on configuring environment variables.

## Publishing
See the [publishing guide](docs/publishing.md) for instructions on:
- Updating the package version
- Publishing to npm
- Verifying the published package

## License
MIT License - see the [LICENSE](LICENSE) file for details
