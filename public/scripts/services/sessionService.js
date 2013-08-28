coolestProjectsApp.factory("sessionService", function($cookies) {
    return {
        get: function(key) {
            return sessionStorage.getItem(key);
        },
        getSecurityHash: function() {
            console.log('Requesting security session ')
            return $cookies.session_hash;
        },
        set: function(key, val) {
            return sessionStorage.setItem(key, val);
        },
        unset: function(key) {
            return sessionStorage.removeItem(key);
        }
    };
});
