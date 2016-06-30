/**
 * Created by Karim on 10.04.2016.
 */

angular.module('courseApp')

    .controller('UserController', ['$http', '$scope', '$rootScope', '$state', 'UserFactory', function($http, $scope, $rootScope, $state,
                                                                                                 UserFactory) {

        $scope.client = {};
        $scope.newClient = {};
        $scope.errorMessage = "";

        $scope.logout = function() {
            UserFactory.logout().then(function() {
                $rootScope.user = null;
            });
        };

        $scope.login = function() {
            UserFactory.login($scope.client).then(
                function(response) {
                    $rootScope.user = response.data;
                    $state.go("app.profile");
                },
                function(err) {
                    $scope.errorMessage = err.data.message;
                }
            );
        };

        $scope.register = function() {
            var phone = $scope.newClient.phone;

            if(phone.length != 10 ||
                !(!isNaN(parseFloat(phone)) && isFinite(phone)) || phone[0] != '0') {
                $scope.errorMessage = "Телефон должен содержать 10 цифр и начинаться с 0";
                return;
            }

            UserFactory.register($scope.newClient).then(
                function(response) {
                    $rootScope.user = response.data;
                    $state.go("app");
                },
                function(error) {
                    $scope.errorMessage = err.data.message;
                }
            );
        };

    }])
;