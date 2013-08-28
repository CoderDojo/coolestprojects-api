coolestProjectsApp.controller('RegisterCtrl', function($scope, $location, $http, errorService) {

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
                    console.log(data);
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
