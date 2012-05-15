# Stores money as cents
# new Change({ dollars: 20.5 })
# new Change({ cents: 2050 })
# Does calculations as cents
# dollars() returns it as a float
# formattedDollars() returns it as formatted money
# requires accounting.js for formatting

root = exports ? this

class root.Change

  cents: 0

  constructor: (options = {}) ->
    if options.dollars?
      # expand dollars out to cents
      @cents = Math.round(parseFloat(options.dollars)*100)
    else if options.cents?
      @cents = parseInt(options.cents)
    else
      @cents = 0


  dollars: ->
    @cents * .01

  formattedDollars: ->
    try
      accounting.formatMoney @dollars()
    catch error
      console.error "Change.js Error: Required library accounting.js not found"


  ##
  # Basic
  # money
  # calculations
  ##

  add: (addend) ->
    new Change(cents: @cents + addend.cents)

  subtract: (subtrahend) ->
    new Change(cents: @cents - subtrahend.cents)


  ##
  # Non-money
  # calculations
  # Useful for tax
  # or calculating discounts
  ##

  multiplyInteger: (factor) ->
    new Change(cents: @cents * parseInt(factor))

  multiplyPercent: (percent) ->
    decimal = percent * .01
    product = Math.round(@cents * decimal)
    new Change(cents: product)

  multiplyDecimal: (decimal) ->
    product = Math.round(@cents * decimal)
    new Change(cents: product)