# Logger

[![npm version](https://badge.fury.io/js/l0gz.svg)](https://badge.fury.io/js/l0gz)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![npm downloads](https://img.shields.io/npm/dm/l0gz.svg?style=flat-square)](https://npm-stat.com/charts.html?package=l0gz)

Helps developers monitor system behavior, debug issues, and analyze application performance

## Overview

A Logger is a fundamental tool in software development used to record application events, errors, and system behaviors. It enables developers to track and analyze how an application performs in real-time or during specific scenarios. Logs are crucial for debugging, troubleshooting, monitoring, and maintaining applications.

## Installation

To install the package, use npm:

```sh
npm i l0gz
```

## Usage
```js
const { Logger } = require('l0gz');

const logger = new Logger();

logger.info('Hello world!');
logger.error('This is an error!');
```

