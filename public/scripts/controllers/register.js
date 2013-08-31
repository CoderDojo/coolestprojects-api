coolestProjectsApp.controller('RegisterCtrl', function($scope, $location, $cookies, $http, errorService, authenticationService) {

    $scope.user = {
        email: "",
        password: "",
        name: "",
        coderdojo: ""
    };
    $scope.repassword = "";
    errorService.clear();

    $scope.register = function() {
        console.log('logging');

        var passed = false;
        errorService.clear();
        passed = validatePassword($scope.user.password, $scope.repassword);

        if (passed) {
            $http.post(API_URL + 'user/register', $scope.user)
                .success(function(data, status, headers, config) {
                    authenticationService.login($scope.user).success(
                        function(data, status, headers, config) {
                            $cookies.session_hash = data.sessionKey;
                            console.log('open home')
                            $location.path("/home");
                        }
                    ).error(function(data, status, headers, config) {
                                if(data.error && data.error.message) {
                                    console.log(data.error.message);
                                    errorService.show(data.error.message);
                                } else {
                                    errorService.show(data);
                                }
                    });
                })
                .error(function(data, status, headers, config) {
                    console.log(data.error.message);
                    errorService.show(data.error.message);
                });
        }
    };

    function validatePassword(password, repassword) {
        if (password != repassword) {
            errorService.show("Passwords do not match");
            return false;
        }
        return true;
    }

});
