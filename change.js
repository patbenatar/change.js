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
        console.error("Change.js Error: Must provide dollars or cents!");
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
    Change.prototype.multiplyTaxPercent = function(taxPercent) {
      var product, taxDecimal;
      taxDecimal = taxPercent * .01;
      product = Math.round(this.cents * taxDecimal);
      return new Change({
        cents: product
      });
    };
    Change.prototype.multiplyTaxDecimal = function(taxDecimal) {
      var product;
      product = Math.round(this.cents * taxDecimal);
      return new Change({
        cents: product
      });
    };
    return Change;
  })();
}).call(this);
