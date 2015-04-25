# Change.js

Change.js is about the simplest you can get with money calculations in JavaScript.
Initialize a `Change` object with dollars or cents and add or subtract amounts or
calculate tax. All calculations are done in cents to avoid floating point
errors. All operations return the result in a new instance of `Change`.

Currency formatting and rounding can be customized via dependency injection.

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
// With dollars
var c1 = new Change({ dollars: 10.5 });

// With cents
var c2 = new Change({ cents: 1050 });
```

### Addition and Subtraction of money

```js
var sum = c1.add(c2);
var difference = c1.subtract(c2);
```

### Multiplication with non-money numbers

```js
// Integer
var total = sum.multiply(2);

// With a percentage
var tax = sum.multiplyPercent(8.25);

// With a decimal
var discounted = sum.multiply(0.25);
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
