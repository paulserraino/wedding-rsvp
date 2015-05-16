var Backbone = require('backbone');

module.exports = Backbone.View.extend({
	events: {
		'submit': 'submit'
	}

, fieldMap: {
		email: '#email'
	, first_name: '#first_name'
	, last_name: '#last_name'
	, reservation: '#reservation:checked'
	, plus_one: '#plus_one'
	, message: '#message'
	}
, initialize: function () {
	console.log('init')
}
, submit: function (e) {
		e.preventDefault();

		this.model.set({
			email: this.$el.find(this.fieldMap.email).val()
		, first_name: this.$el.find(this.fieldMap.first_name).val()
		, last_name: this.$el.find(this.fieldMap.last_name).val()
		, reservation: this.$el.find(this.fieldMap.reservation).val()
		, plus_one: this.$el.find(this.fieldMap.plus_one).val()
		, message: this.$el.find(this.fieldMap.message).val()
		})

		if (!this.model.isValid()) {
			return this.displayErrors(this.model.validationError);
		}

	}
, displayErrors: function (errors) {
		console.log(errors);
	}
});