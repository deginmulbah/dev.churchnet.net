(function ($) {
  'use strict'; // Start of use strict

  $(document).ready(function () {

    /* ------------------------------------------------------------------------
     * Validation
     * ------------------------------------------------------------------------ */

    // -----------------------------------------------------------------------------
    // sign up form client side validation and submit
    // -----------------------------------------------------------------------------
    const _signupForm = $("#signupForm");
    if (_signupForm.exists()) {
      _signupForm.validate({
        rules: {
          username: {
            required: true,
            minlength: 2,
            email: true
          },
          password: {
            required: true,
            minlength: 5
          },
          confirmPass: {
            required: true,
            minlength: 5,
            equalTo: "#password"
          },
        },
        messages: {
          username: {
            required: "Please enter a username",
            minlength: "Your username must consist of at least 2 characters",
            email: "Please enter a valid email address",
          },
          password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
          },
          confirmPass: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long",
            equalTo: "Please enter the same password as above"
          },
        },
      })
    }
    const _church_setting = $("#church_setting");
    if (_church_setting.exists()) {
      _church_setting.validate({
        rules: {
          churchname: {
            required: true,
          },
          address: {
            required: true,
          },
          email: {
            required: true,
            email: true
          },
          pho1: {
            required: true,
          },
          country: {
            required: true,
          },
          county: {
            required: true,
          },
          city: {
            required: true,
          },
          serv_end: {
            required: true,
          },
          serv_start: {
            required: true,
          },
        },
      })
    }
    //code to hide topic selection, disable for demo
    var _newsletter = $("#newsletter");
    if (_newsletter.exists()) {
      // newsletter topics are optional, hide at first
      var inital = _newsletter.is(":checked");
      var topics = $("#newsletter_topics")[inital ? "removeClass" : "addClass"]("gray");
      var topicInputs = topics.find("input").attr("disabled", !inital);
      // show when newsletter is checked
      _newsletter.click(function () {
        topics[this.checked ? "removeClass" : "addClass"]("gray");
        topicInputs.attr("disabled", !this.checked);
      });
    }

  });

})(jQuery); // End of use strict