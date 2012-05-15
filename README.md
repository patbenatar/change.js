# Change.js

Change.js is about the simplest you can get with money calculations in JavaScript. Initialize a Change() object with dollars or cents (see below) and add or subtract amounts or calculate tax. All calculations are done in cents to avoid floating point errors. All operations return the result in a new instance of Change().

## Installation

* Download your flavor (JS or Coffee) and include it in your app
* If you'd like to use Change.formattedDollars(), include [accounting.js](http://josscrowcroft.github.com/accounting.js/)

## Usage

### Initializing

    # With dollars
    c1 = new Change({ dollars: 10.5 })

    # With cents
    c2 = new Change({ cents: 1050 })

### Addition and Subtraction

    sum = c1.add(c2)
    difference = c1.subtract(c2)

### Tax

    # With a percentage
    tax = sum.multiplyTaxPercent(8.25)

    # With a decimal
    tax = sum.multiplyTaxDecimal(0.0825)

### Getting your dollars back!

    # As a float
    sum.dollars()

    # As formatted US dollars (requires accounting.js)
    sum.formattedDollars()

## Caveats

Change.js currently only supports US dollars.