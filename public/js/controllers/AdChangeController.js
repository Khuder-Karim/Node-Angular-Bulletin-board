/**
 * Created by Karim on 12.05.2016.
 */

angular.module('courseApp')

    .controller('AdChangeController', ['$scope', '$stateParams', '$state', 'AdFactory',
    function($scope, $stateParams ,$state, AdFactory) {

        $scope.errorMessage = '';

        AdFactory.getAdDetails($stateParams.id).then(
            function(response) {
                $scope.ad = response.data;
                $scope.adSchema = response.data;
            },
            function(err) {
                $scope.errorMessage = err.data.status + err.data.message;
            }
        );

        $scope.submitChange = function() {
            AdFactory.postChange($scope.adSchema, $scope.adSchema._id).then(
                function(response) {
                    $state.go('app.profile');
                },
                function(err) {
                    $scope.errorMessage = err.data.status + err.data.message;
                }
            );
        };

    }])

;
