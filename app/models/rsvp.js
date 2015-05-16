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
			types: ['boolean']	
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
		console.log('validating...', props)
		for (var p in props) {
			var s = this.schema[p];
			var val = props[p];

			if (s.types.indexOf(typeof props[p]) === -1) {
				return p + ' is the wrong type';
			}

			if (s.required && !val) {
				return p.replace('_', ' ') + ' is required';
			}

			if (s.min && val.toString().length < s.min) {
				return p.replace('_', ' ') + ' should be greater than ' + s.min;
			}

			if (s.exp && !s.exp.test(val)) {
				return 'invalid :p format'.replace(':p', p);
			}
		}
	}
});