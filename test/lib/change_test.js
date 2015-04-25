'use strict';

var Change = require('../../lib/change')(),
    accounting = require('accounting');

describe('Change.js', function() {
  describe('constructor', function() {
    context('initialized with cents', function() {
      it('sets cents to the given value', function() {
        var change = new Change({ cents: 5000 });
        expect(change.cents).to.equal(5000);
      });

      it('works with string values', function() {
        var change = new Change({ cents: '5000' });
        expect(change.cents).to.equal(5000);
      });
    });

    context('initialized with dollars', function() {
      it('calculates cents from the given value', function() {
        var change = new Change({ dollars: 50.25 });
        expect(change.cents).to.equal(5025);
      });

      it('works with string values', function() {
        var change = new Change({ dollars: '50.25' });
        expect(change.cents).to.equal(5025);
      });

      it('rounds', function() {
        var change = new Change({ dollars: 50.257 });
        expect(change.cents).to.equal(5026);
      });

      context('with a custom rounder', function() {
        it('uses that rounder', function() {
          var ChangeWithRounder =
            require('../../lib/change')({ rounder: Math.floor });

          var change = new ChangeWithRounder({ dollars: 50.257 });
          expect(change.cents).to.equal(5025);
        });
      });
    });

    it('defaults to 0', function() {
      var change = new Change();
      expect(change.cents).to.equal(0);
    });
  });

  describe('#dollars', function() {
    it('returns float representation of amount in dollars', function() {
      var change = new Change({ cents: 2055 });
      expect(change.dollars()).to.equal(20.55);
    });
  });

  describe('#formattedDollars', function() {
    context('when a formatter is provided', function() {
      it('returns formatted string representation of amount', function() {
        var ChangeWithFormatter =
          require('../../lib/change')({ formatter: accounting.formatMoney });

        var change = new ChangeWithFormatter({ cents: 2055 });
        expect(change.formattedDollars()).to.equal('$20.55');
      });
    });

    context('without a formatter', function() {
      it('throws an exception', function() {
        var change = new Change({ cents: 2055 });
        expect(change.formattedDollars).to.throw();
      });
    });
  });

  describe('#add', function() {
    it('adds given change object', function() {
      var change = new Change({ cents: 2055 });
      var addend = new Change({ cents: 100 });
      var result = change.add(addend);

      expect(result.cents).to.equal(2155);
    });
  });

  describe('#subtract', function() {
    it('subtracts given change object', function() {
      var change = new Change({ cents: 2055 });
      var subtrahend = new Change({ cents: 100 });
      var result = change.subtract(subtrahend);

      expect(result.cents).to.equal(1955);
    });
  });

  describe('#multiply', function() {
    it('works with integers', function() {
      var change = new Change({ cents: 2055 });
      var result = change.multiply(2);

      expect(result.cents).to.equal(4110);
    });

    it('works with floats, rounding', function() {
      var change = new Change({ cents: 2055 });
      var result = change.multiply(2.5);

      expect(result.cents).to.equal(5138);
    });

    context('with a custom rounder', function() {
      it('uses that rounder', function() {
        var ChangeWithRounder =
          require('../../lib/change')({ rounder: Math.floor });

        var change = new ChangeWithRounder({ cents: 2055 });
        var result = change.multiply(2.5);

        expect(result.cents).to.equal(5137);
      });
    });
  });

  describe('#multiplyPercent', function() {
    it('works with integers, rounding', function() {
      var change = new Change({ cents: 2055 });
      var result = change.multiplyPercent(25);

      expect(result.cents).to.equal(514);
    });

    it('works with floats, rounding', function() {
      var change = new Change({ cents: 2055 });
      var result = change.multiplyPercent(2.99);

      expect(result.cents).to.equal(61);
    });

    context('with a custom rounder', function() {
      it('uses that rounder', function() {
        var ChangeWithRounder =
          require('../../lib/change')({ rounder: Math.ceil });

        var change = new ChangeWithRounder({ cents: 2055 });
        var result = change.multiplyPercent(2.99);

        expect(result.cents).to.equal(62);
      });
    });
  });

  describe('.sum', function() {
    it('adds all provided change objects together', function() {
      var item1 = new Change({ cents: 1000 });
      var item2 = new Change({ cents: 3500 });
      var item3 = new Change({ cents: 1525 });

      var total = Change.sum([item1, item2, item3]);
      expect(total.cents).to.equal(6025);
    });

    it('supports a list of args instead of an array', function() {
      var item1 = new Change({ cents: 1000 });
      var item2 = new Change({ cents: 3500 });

      var total = Change.sum(item1, item2);
      expect(total.cents).to.equal(4500);
    })
  });
});
