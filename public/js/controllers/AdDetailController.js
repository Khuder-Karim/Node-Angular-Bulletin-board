/**
 * Created by Karim on 13.04.2016.
 */

angular.module('courseApp')

    .controller('AdDetailController', ['$scope', '$stateParams', '$sce', 'AdFactory', function($scope, $stateParams, $sce, AdFactory) {
        $scope.ad = {};
        AdFactory.getAds().get({id: $stateParams.id})
            .$promise.then(
                function(response) {
                    $scope.ad = response;
                },
                function(err) {
                    console.log(err.status + ' ' + err.statusText);
                }
            )
        ;

    }])
;