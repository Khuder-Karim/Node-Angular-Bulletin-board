/**
 * Created by Karim on 13.04.2016.
 */

angular.module('courseApp')

    .controller('AdDetailController', ['$scope', '$stateParams', 'AdFactory', function($scope, $stateParams, AdFactory) {
        $scope.ad = {};
        AdFactory.getAdDetails($stateParams.id).then(
            function(response) {
                $scope.ad = response.data;
            },
            function(err) {
                console.error(err.data.status, err.data.message);
            }
        );
    }])
;