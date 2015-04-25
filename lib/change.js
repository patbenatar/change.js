'use strict';

var _ = require('underscore');

module.exports = function(dependencies) {
  dependencies = dependencies || {};
  var round = dependencies.rounder || Math.round;
  var formatMoney = dependencies.formatter;

  var Change = function(options) {
    options = options || {};

    if(options.cents) {
      this.cents = parseInt(options.cents);
    } else if (options.dollars) {
      this.cents = round(parseFloat(options.dollars) * 100);
    } else {
      this.cents = 0;
    }
  };

  _.extend(Change.prototype, {
    dollars: function() {
      return this.cents * 0.01;
    },

    formattedDollars: function() {
      if(formatMoney) {
        return formatMoney(this.dollars());
      } else {
        throw 'No formatter provided';
      }
    },

    add: function(addend) {
      return new Change({ cents: this.cents + addend.cents });
    },

    subtract: function(subtrahend) {
      return new Change({ cents: this.cents - subtrahend.cents });
    },

    multiply: function(factor) {
      return new Change({ cents: round(this.cents * factor) });
    },

    multiplyPercent: function(percentFactor) {
      return this.multiply(percentFactor * .01);
    }
  });

  return Change;
};
