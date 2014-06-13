(function ($) {
	var colors = ["#F22613", "#19B5FE", "deeppink", "fuchsia", "lightgreen", 
	"lime", "yellow", "springgreen", "deepskyblue", "orangered"];

	var images = ["/images/sample1.jpg", "/images/sample2.jpg"];

	$(document).ready(function () {
		var rc = Math.floor(Math.random() * ((colors.length-1) + 1));
		var $heart = $("span.heart");
		var $rsvpForm = $("#rsvp-form");
		var $mainSection = $("#main-section");

		$heart.css("color", colors[rc]);

		$heart.on("click", function (e) {
			e.preventDefault();

		});

		$rsvpForm.on("submit", function (e) {
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

		/*
		setInterval(function () {
			var rand = Math.floor(Math.random() * ((images.length-1) + 1));

			$mainSection.css("background-image", "url("+images[rand]+")");
		}, 1000);
		*/



	});

	


})(jQuery);