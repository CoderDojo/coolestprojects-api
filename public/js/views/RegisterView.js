app.views.RegisterView = Backbone.View.extend({
    createUser: function() {
        
        var email = $("#email").val();
        var password = $("#password").val();
        var name = $("#name").val();
        var coderdojo = $("#coderdojo").val();

        var user = new User({'email': email, 'password': password, 'name': name, 'coderdojo': coderdojo});
        user.save({}, {             
            success: function(model, response) {
                alert ("User saved successfully");
            }, error: function(model, response) {
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
        "submit": "createUser"
    }
});
