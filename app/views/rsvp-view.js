var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
Backbone.$ = $;

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
    var this_ = this;
    this.clearErrors();

    this.model.set({
      email: this.$el.find(this.fieldMap.email).val()
    , first_name: this.$el.find(this.fieldMap.first_name).val()
    , last_name: this.$el.find(this.fieldMap.last_name).val()
    , reservation: this.$el.find(this.fieldMap.reservation).val()
    , plus_one: this.$el.find(this.fieldMap.plus_one).val()
    , message: this.$el.find(this.fieldMap.message).val()
    })

    if (!this.model.isValid()) {
      return this.displayError(this.model.validationError);
    }

    this.model.save(null, {
      validate: false
    , success: function ( user ) {
        conso.log('user ', user);
        var template = _.template(this_.template.html());
        $('body').prepend( template( { user: user } ) );
      }
    , errors: function () {
        alert('unable to submit rsvp :(');
      }
    });
  }

, displayError: function (error, selector) {
    selector = selector || '[name=":p"]'.replace(':p', error.prop);
    var $el = this.$el.find(selector);
    var $span = $('<span class="errors">').text(error.message);
    var red = '#D91E18';

    $el.addClass('errors');
    $el.siblings('label').append($span);
    $el.focus();

    return this;
  }

, clearErrors: function() {
    $('label > span.errors').remove();
    $('.errors').removeClass('errors');
    return this;
  }
});