# npm-stats-api

Node Package's Statistics API | Our functions will provide statistics of node package | This is a Node.js API wrapper for the NPM API and Registry. Based on the original npm-stat-api.

## Description

This library provides a simple way to fetch npm package download statistics and package details from the npm registry.

## Installation

```bash
npm install npm-stats-api
# or
yarn add npm-stats-api
# or
pnpm add npm-stats-api
```

## Usage

### CommonJS

```javascript
const { stat, details } = require("npm-stats-api");

// Get package download statistics
stat("npm-stats-api", "2022-01-01", "2022-02-15")
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });

// Get package details
details("npm-stats-api")
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```

### ESM

```javascript
import { stat, details } from "npm-stats-api";

// Using async/await
async function getStats() {
  try {
    // Get package download statistics
    const statsResult = await stat("npm-stats-api", "2022-01-01", "2022-02-15");
    console.log(statsResult);
    
    // Get package details
    const detailsResult = await details("npm-stats-api");
    console.log(detailsResult);
  } catch (error) {
    console.error(error);
  }
}

getStats();
```

## Response Formats

### `stat` function response

```javascript
{
  statusCode: 200,
  body: {
    downloads: 628,
    start: '2022-01-01',
    end: '2022-02-15',
    package: 'npm-stats-api'
  }
}
```

### `details` function response

```javascript
{
  statusCode: 200,
  body: {
    _id: 'npm-stats-api',
    name: 'npm-stats-api',
    description: '...',
    version: '2.1.2',
    // Other package details...
  }
}
```

## Error Handling

All functions throw a `NpmException` with the following structure:

```javascript
{
  name: 'NpmException',
  message: 'Error message',
  statusCode: 400, // HTTP status code
  body: {
    // Error details
  }
}
```

Example of catching errors:

```javascript
import { stat, NpmException } from 'npm-stats-api';

try {
  const result = await stat('non-existent-package', '2022-01-01', '2022-01-31');
  console.log(result);
} catch (error) {
  if (error instanceof NpmException) {
    console.log(`Status code: ${error.statusCode}`);
    console.log(`Error message: ${error.message}`);
    console.log(`Error body:`, error.body);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Limitations

Quote from npm registry documentation:

> Bulk queries are limited to at most 128 packages at a time and at most 365 days of data. All other queries are limited to at most 18 months of data. The earliest date for which data will be returned is January 10, 2015.

Source: [npm registry documentation](https://github.com/npm/registry/blob/master/docs/download-counts.md#limits)

## License

MIT
