var User = Backbone.Model.extend({

    defaults: function() {
      return {
        email: null,
        password: null,
        name: null,
        coderdojo: null
      };
    },

    url: function() {
      return '/user/register';
    }
});