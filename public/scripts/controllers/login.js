coolestProjectsApp.controller('LoginCtrl', function($scope, $location, $cookies, authenticationService, sessionService, errorService) {
    $scope.credentials = {
        email: "",
        password: ""
    };

    $scope.login = function() {
        console.log('Login called ');
        authenticationService.login($scope.credentials).success(
            function(data, status, headers, config) {
                $cookies.session_hash = data.sessionKey;
                $location.path("/home");
            }
        ).error(function(data, status, headers, config) {
                    console.log(data.error.message);
                    errorService.show(data.error.message);
        });
    };
});
