app.views.LoginView = Backbone.View.extend({

    login: function() {
        var email = $("#email").val();
        var password = $("#password").val();
        
        $("#error").hide();
        $("#error").text('');

        var user = new Register({'email': email, 'password': password});
        user.save({}, {             
            success: function(model, response) {
                $.cookie('session_hash', response.sessionKey, { expires: 3, path: '/' });
                app.slider.slidePage(new app.views.HomeView().render().$el);
            }, error: function(model, response) {
                console.log(response);
                var responseObj = JSON.parse(response.responseText);
                console.log(responseObj.error.message);
                $("#error").text(responseObj.error.message);
                $("#error").show();
            }
        }); 
        return false;
    },

    render: function() {
        this.$el.html(this.template());
        $("#error").hide();
        $("#error").text('');
        return this;
    },

    events: {
        "submit": "login"
    }
});
