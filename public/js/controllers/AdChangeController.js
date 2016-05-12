/**
 * Created by Karim on 12.05.2016.
 */

angular.module('courseApp')

    .controller('AdChangeController', ['$scope', '$stateParams', '$state', 'AdFactory',
    function($scope, $stateParams ,$state, AdFactory) {

        $scope.errorMessage = '';

        $scope.ad = AdFactory.getAds().get({id: $stateParams.id})
            .$promise.then(
                function(response) {
                    $scope.adSchema = response;
                },
                function(error) {
                    $scope.errorMessage = response.status + " " + response.statusText;
                }
            )
        ;

        $scope.submitChange = function() {
            AdFactory.postChange("ad/" + $scope.adSchema._id, $scope.adSchema);
        };

    }])

;
