coolestProjectsApp.factory("authenticationService", function($http, sessionService) {
    var cacheSession = function() {
        sessionService.set('authenticated', true);
    };

    var uncacheSession = function() {
        sessionService.unset('authenticated');
    };

    return {
        login: function(credentials) {
            console.log(API_URL + "user/login");
            var login = $http.post(API_URL + "user/login", credentials);
            login.success(cacheSession);
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
