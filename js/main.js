(function ($) {

	var RSVPUI = {
		colors: ["#F22613", "#19B5FE", "deeppink", "fuchsia", "lightgreen", "lime", 
		"yellow", "springgreen", "deepskyblue", "orangered"],
		images: ["/images/sample1.jpg", "/images/sample2.jpg"],
		this.dropbox: null,
		init: function () {
			
			this.dropbox = new Dropbox.Client({key: "r0zz4zwd7w1h358"});

			// random heart color when page loads
			this.setHeartColor(this.randomColor());
			this.attachRSVPBtn();
			this.attachSubmit();
		},
		attachRSVPBtn: function () {
			var self = this;
			$("button.rsvp-btn").on("click", function (e) {
				e.preventDefault();
				var resv = $(this).attr("data");
				$("input[name='reservation']").val(resv);

				$("form#rsvp-form").submit();	
			});
		},
		attachSubmit: function () {
			var self = this;
			$("form#rsvp-form").on("submit", function (e) {
				e.preventDefault();

				if(self.validateForm($(this).serialize())) {
					console.log("form is valid")
				}

		
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
		validateForm: function (data) {
			console.log(data);
			var fields = data.split("&");
			var valid = true;
			var kv;
			$("input").css("border-color", "#ccc");
			for (var f=0; f < fields.length; f++) {
				kv = fields[f].split("=")
				if( kv[1] === "") {
					valid = false;
					$("input[name='"+kv[0]+"']").css("border-color", "red");
				}
			}

			var email = fields[2].split("=")[1];
			if(!this.validateEmail(decodeURIComponent(email))){
				$("input[name='email']").css("border-color", "red");
				return false;
			} else {
				return true;
			}

			
		},
		validateEmail: function (email) {
		    var re = /\S+@\S+\.\S+/;
		    return re.test(email);
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