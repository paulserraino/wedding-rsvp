(function ($) {

	var RSVPUI = {
		colors: ["#F22613", "#19B5FE", "deeppink", 
		"fuchsia", "lightgreen", "lime", "yellow", "springgreen", 
		"deepskyblue", "orangered"],
		images: ["/images/sample1.jpg", "/images/sample2.jpg"],
		init: function () {

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

                    var newRSVP = self.paramsToJSON($(this).serialize());


                    self.getDb().done(function (data) {
                    	if (typeof data === "string") data = JSON.parse(data);

                    	// check for duplicate records
                    	var dups = _.filter(data.rows, function (r) {
                    		return r.doc.email === newRSVP.email;
                    	});
                    	
                    	console.log('dups: ', dups);


                    	if (dups.length <= 0) {
                    		console.log('saving ', newRSVP);
                    		newRSVP = JSON.stringify(newRSVP);
                    		self.addRSVP(newRSVP).done(function (data) {
                    			window.location.href = "/thankyou/";
                    		});
                    	} else {
                    		window.location.href = "/thankyou/";
                    	}
                    });
                    
				}

			});

		},
		validateForm: function (data) {
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
		},
        paramsToJSON: function(params) {
          var pairs = params.split("&"),
              kv = null, obj = {};
          for (var i=0; i < pairs.length; i++) {
            kv = pairs[i].split("=");
            obj[kv[0]] = kv[1];
          }

          return obj;
        },
        getDb: function () {
        	return $.ajax({
        		url: "https://paulserraino.cloudant.com/jesuswedding/_all_docs?include_docs=true",
        		dataType: 'jsonp'
        	});
        },
        addRSVP: function (record) {
        	return $.ajax({
        		type: "POST",
	            url: "https://paulserraino.cloudant.com/jesuswedding",
	            contentType: "application/json",
	            data: record
        	});
        }

	}

	$(document).ready(function () {
		RSVPUI.init();
	});


})(jQuery);
