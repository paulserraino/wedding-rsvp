(function ($) {

	var RSVPUI = {
		colors: ["#F22613", "#19B5FE", "deeppink", "fuchsia", "lightgreen", "lime", 
		"yellow", "springgreen", "deepskyblue", "orangered"],
		images: ["/images/sample1.jpg", "/images/sample2.jpg"],
		init: function () {
			// random heart color when page loads
			this.setHeartColor(this.randomColor());
		},
		submit: function () {
			$("#rsvp-form").on("submit", function () {
				e.preventDefault();

				$.ajax({
					type: "POST",
					url: "/rsvp/new",
					data: $(this).serialize()
				}).done(function (data) {

				}).fail(function (err) {
					console.log("Failed to rsvp ", err);
				});

			});
		},
		randomColor: function () {
			var rc = Math.floor(Math.random() * ((this.colors.length-1) + 1));
			return this.colors[rc];
		},
		setHeartColor: function (color) {
			$("span.heart").css("color", color);
		},
		imageSlider: function () {
			$("span.heart").on("click", function (e) {
				e.preventDefault();
			});
		}

	}

	$(document).ready(function () {
		RSVPUI.init();
	});


})(jQuery);