(function ($) {

  $(document).ready(function () {
    RSVPUI.init();
  });

})(jQuery);

var RSVPUI = {
  init: function () {
    this.attachSubmit();
  },

  attachSubmit: function () {
    var self = this;
    $(".submit-btn").on("click", function (e) {
      e.preventDefault();

      var apiURL = "https://paulserraino.cloudant.com/jesuswedding";

      if( !self.validateForm( $(this).serialize() ) ) return;

      var newRSVP = self.paramsToJSON($(this).serialize());

      $.ajax({
        url: apiURL + "/_all_docs?include_docs=true"
      })
      .done(function (data) {
        if (typeof data === "string") data = JSON.parse(data);

        // check for duplicate records
        var dups = _.filter(data.rows, function (r) {
          return r.doc.email === newRSVP.email;
        });

        if (dups.length > 0) return window.location.href = "/thankyou/";
        var record = JSON.stringify(newRSVP);

        $.ajax({
          type: "POST",
            url: apiURL,
            contentType: "application/json",
            data: record,
            success: function () {
              window.location.href = "/thankyou/";
            }
        });

      });
                  
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

  paramsToJSON: function(params) {
    var pairs = params.split("&"),
        kv = null, obj = {};
    for (var i=0; i < pairs.length; i++) {
      kv = pairs[i].split("=");
      obj[kv[0]] = kv[1];
    }
    return obj;
  }

};

