var $ = require('jQuery');
var rspvView = require('../views/rsvp-view');
var RSPV = require('../models/rsvp');
window.jQuery = $;
$(function () {
	var view = new rspvView({
		el: '.rsvp-form'
	, model: new RSPV()
	});
});
