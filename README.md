# Kolibri-JS-Core

The library contains the core models and utils of the Kolibri Protocol.

## Features

The Kolibri-JS-Core encapsulates most of the Kolibri Protocol internals and provide a modern and easy to use interface for implementing Kolibri based applications.

- Versioned class and plain json object based models
- Binary encoding and decoding of the Kolibri Producer Protocol
- Utility classes and functions
- NodeJS and browser support
- Support for Kolibri-RPC
- Fully typed

## Install

NPM

```bash
npm install @hms-networks/kolibri-js-core
```

Yarn

```bash
yarn add @hms-networks/kolibri-js-core
```

reflect-metadata shim is required, install it too:

```bash
npm install reflect-metadata --save
```

## Supported Kolibri Versions

Currently supported Kolibri Consumer Protocol Versions:

- v1.0
- V2.1
- V3.0
- V3.1
- v3.2
- v3.3

### Node and Browser Support

The lib currently supports Browser Single Page applications and NodeJS environments.

HTML Apps can import the minimized bundle from the location build/bundles/kolibri-js-core.umd.min.js

```html
<html>
  <head>
    <!-- ... -->
      <script src="./build/bundles/kolibri-js-core.umd.min.js"></script>
  </head>
  <!-- ... -->
</html>
```

add script to reflect-metadata in the head of your index.html:

```html
<html>
  <head>
    <!-- ... -->
    <script src="node_modules/reflect-metadata/Reflect.js"></script>
  </head>
  <!-- ... -->
</html>
```
If you are using angular 2 you should already have this shim installed.

## Getting Started

Kolibri Consumer Protocol Versions listed above are exported as version specific namespace object and can be imported.

Importing:

```typescript

import { cV10 } from '@hms-networks/kolibri-js-core';

```

Class based usage:

```typescript
const params = new cV10.LoginParams('Username', 'Password', 60, 5);
```

Plain JSON object usage:

```typescript
const params: cV10.LoginParams = {
      user: 'Username',
      password: 'Password',
      interval: 60,
      timeout: 5
};
```
