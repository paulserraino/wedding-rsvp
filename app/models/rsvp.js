var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
  url: 'https://paulserraino.cloudant.com/jesuswedding'

, schema: {
    email: {
      types: ['string']
    , required: true
    , exp: /\S+@\S+\.\S+/
    }
  , first_name: {
      types: ['string']
    , required: true
    , min: 2
    }
  , last_name: {
      types: ['string']
    , required: true
    , min: 2
    }
  , reservation: {
      types: ['string']
    , required: true
    }
  , plus_one: {
      types: ['string']
    , required: false
    }
  , message: {
      types: ['string']
    , required: false
    }
  }
  , validate: function (props, options) {
      for (var p in props) {
        var s = this.schema[p];
        var val = props[p];
        var error = { prop: p };

        if (s.types.indexOf(typeof props[p]) === -1) {
          error.message = p + ' is the wrong type';
          return error;
        }

        if (s.required && !val) {
          error.message = p.replace('_', ' ') + ' is required';
          return error;
        }

        if (s.min && val.toString().length < s.min) {
          error.message = p.replace('_', ' ') + ' should be greater than ' + s.min;
          return error;
        }

        if (s.exp && !s.exp.test(val)) {
          error.message = 'invalid :p format'.replace(':p', p);
          return error;
        }
      }
    }
});