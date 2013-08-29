coolestProjectsApp.factory("authenticationService", function($http, sessionService) {
    var cacheSession = function() {
        sessionService.set('authenticated', true);
    };

    var uncacheSession = function() {
        sessionService.unset('authenticated');
    };

    return {
        login: function(credentials) {
            var login = $http.post(API_URL + "user/login", credentials);
            login.success(cacheSession);
            //login.error(loginError);
            return login;
        },
        logout: function() {
            var logout = $http.get(API_URL + "auth/logout");
            logout.success(uncacheSession);
            return logout;
        },
        isAuthenticated: function() {
            return sessionService.get('authenticated');
        }
    };
});
