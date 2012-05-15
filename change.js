(function() {
  var root;
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.Change = (function() {
    Change.prototype.cents = 0;
    function Change(options) {
      if (options == null) {
        options = {};
      }
      if (options.dollars != null) {
        this.cents = Math.round(parseFloat(options.dollars) * 100);
      } else if (options.cents != null) {
        this.cents = parseInt(options.cents);
      } else {
        this.cents = 0;
      }
    }
    Change.prototype.dollars = function() {
      return this.cents * .01;
    };
    Change.prototype.formattedDollars = function() {
      try {
        return accounting.formatMoney(this.dollars());
      } catch (error) {
        return console.error("Change.js Error: Required library accounting.js not found");
      }
    };
    Change.prototype.add = function(addend) {
      return new Change({
        cents: this.cents + addend.cents
      });
    };
    Change.prototype.subtract = function(subtrahend) {
      return new Change({
        cents: this.cents - subtrahend.cents
      });
    };
    Change.prototype.multiplyInteger = function(factor) {
      return new Change({
        cents: this.cents * factor
      });
    };
    Change.prototype.multiplyPercent = function(percent) {
      var decimal, product;
      decimal = percent * .01;
      product = Math.round(this.cents * decimal);
      return new Change({
        cents: product
      });
    };
    Change.prototype.multiplyDecimal = function(decimal) {
      var product;
      product = Math.round(this.cents * decimal);
      return new Change({
        cents: product
      });
    };
    return Change;
  })();
}).call(this);
