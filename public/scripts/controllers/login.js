coolestProjectsApp.controller('LoginCtrl', function($scope, $location, authenticationService, sessionService) {
    $scope.credentials = {
        email: "",
        password: ""
    };

    $scope.login = function() {
        console.log('Login called ')
        authenticationService.login($scope.credentials).success(
            function(data, status, headers, config) {
                $location.path("/home");
            }
        );
    };
});
