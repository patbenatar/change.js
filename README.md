# Change.js

Change.js is about the simplest you can get with money calculations for USD.
Initialize a `Change` object with dollars or cents and add or subtract amounts or
calculate tax. All calculations are done in cents to avoid floating point
errors. All operations return the result in a new instance of `Change`.

Currency formatting and rounding can be customized via dependency injection.

[![Code Climate](https://codeclimate.com/github/patbenatar/change.js/badges/gpa.svg)](https://codeclimate.com/github/patbenatar/change.js)
[![Test Coverage](https://codeclimate.com/github/patbenatar/change.js/badges/coverage.svg)](https://codeclimate.com/github/patbenatar/change.js)

## Setup

### Requiring

Change exports a function to support injecting dependencies as arguments. When
you don't want to customize anything, this just means you'll need to call it
without arguments upon requiring:

```js
var Change = require('change-js')();
```

### Injecting dependencies

You can control how money is formatted and how decimals are rounded. For
formatting, see `formatMoney` in [accounting.js](http://openexchangerates.github.io/accounting.js/).

```js
var Change = require('change-js')({
  formatter: accounting.formatMoney,
  rounder: Math.floor
});
```

## Usage

### Initializing

```js
// With cents
var c2 = new Change({ cents: 1050 });

// With dollars
var c1 = new Change({ dollars: 10.5 });
```

### Calculations

All calculations return new `Change` instances and do not mutate the original
object.

```js
var sum = c1.add(c2);
var difference = c1.subtract(c2);

var total = sum.multiply(2);
var discounted = sum.multiply(0.25);

// With a percentage, for convenience
var tax = sum.multiplyPercent(8.25);

// Chaining
var total = c1.add(c2).multiplyPercent(8.25);
```

### Getting your dollars back!

```js
// As a float
sum.dollars();

// As formatted US dollars (requires injecting a formatter)
sum.formattedDollars();
```

## Caveats

Change.js currently only supports US dollars.
