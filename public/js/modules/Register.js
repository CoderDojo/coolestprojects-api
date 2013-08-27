var Register = Backbone.Model.extend({

    defaults: function() {
      return {
        email: null,
        password: null
      };
    },

    url: function() {
      return '/user/login';
    }
});