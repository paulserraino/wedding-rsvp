var $ = require('jQuery');
var rspvView = require('../views/rsvp-view');
var RSPV = require('../models/rsvp');
window.jQuery = $;
$(function () {

	var view = new rspvView({
		el: '.rsvp-form'
	, model: new RSPV()
	, template: $('#thankyou-template')
	});

	var scroll = function(el, ms){
    var speed = (ms) ? ms : 600;
    $('html,body').animate({
        scrollTop: $(el).offset().top
    }, speed);
	};

	$('.rsvp-link').on('click', function (e) {
		e.preventDefault();
		scroll(e.target.getAttribute('href'));
	});
});
