# Change.js

Change.js is about the simplest you can get with money calculations in JavaScript. Initialize a Change() object with dollars or cents (see below) and add or subtract amounts or calculate tax. All calculations are done in cents to avoid floating point errors. All operations return the result in a new instance of Change().

## Installation

1. Download your flavor (JS or Coffee) and include it in your app
1. If you'd like to use Change.formattedDollars(), include [accounting.js](http://josscrowcroft.github.com/accounting.js/)

## Usage

### Initializing

```coffeescript
# With dollars
c1 = new Change({ dollars: 10.5 })

# With cents
c2 = new Change({ cents: 1050 })
```

### Addition and Subtraction of money

```coffeescript
sum = c1.add(c2)
difference = c1.subtract(c2)
```

### Multiplication with non-money numbers

```coffeescript
# Integer
total = sum.multiplyInteger(2)

# With a percentage
tax = sum.multiplyPercent(8.25)

# With a decimal
discounted = sum.multiplyDecimal(0.25)
```

### Getting your dollars back!

```coffeescript
# As a float
sum.dollars()

# As formatted US dollars (requires accounting.js)
sum.formattedDollars()
```
## Caveats

Change.js currently only supports US dollars.