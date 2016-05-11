/**
 * Created by Karim on 10.04.2016.
 */

angular.module('courseApp')

    .controller('UserController', ['$stateParams', '$scope', '$rootScope', '$state', 'UserFactory', 'SessionFactory', function($stateParams, $scope, $rootScope, $state,
                                                                                                 UserFactory, SessionFactory) {

        $scope.userObject = {
            username: '',
            password: ''
        };

        $scope.registerData = {
            username: '',
            password: '',
            email: '',
            phone: ''
        };

        $scope.errorMessage = '';

        $scope.logout = function() {
            UserFactory.logout().save(
                function() {
                    SessionFactory.getSession();
                    $state.go('app');
                },
                function(err) {
                    console.log(err);
                }
            );
        };

        $scope.login = function() {
            UserFactory.login().save($scope.userObject,
                function() {
                    SessionFactory.getSession();
                    $state.go('app');
                },
                function(err) {
                    console.log(err);
                    $scope.errorMessage = err.data.message;
                }
            );
        };

        $scope.register = function() {
            var phone = $scope.registerData.phone;

            if(phone.length != 10 ||
                (!isNaN(parseFloat(phone)) && isFinite(phone)) || phone[0] != '0') {
                $scope.errorMessage = "Введите корректный номер телефона";
                return;
            }

            UserFactory.register().save($scope.registerData,
                function() {
                    SessionFactory.getSession();
                    $state.go('app');
                },
                function(err) {
                    $scope.errorMessage = err.data.message;
                }
            );
        };

    }])
;