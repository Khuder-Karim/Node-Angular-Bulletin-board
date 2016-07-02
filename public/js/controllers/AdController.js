/**
 * Created by Karim on 12.04.2016.
 */

angular.module('courseApp')

    .controller('AdController', ['$scope', '$rootScope', '$state', 'AdFactory', 'SubscribeFactory', '$location',
        function($scope, $rootScope, $state, AdFactory, SubscribeFactory, $location) {

        init();

        $scope.postAd = function() {
            AdFactory.post($scope.adSchema).then(
                function(response) {
                    $scope.listAds.push(response.data);
                    $scope.listMyAds.push(response.data);
                    $state.go('app.profile');
                },
                function(error) {
                    console.error(error.data.status, error.data.message);
                }
            )
        };


        $scope.subscribe = function(ad) {
            SubscribeFactory.subscribe(ad._id).then(function() {
                console.log("subscribe");
                $scope.observeAds.push(ad);
                $rootScope.user.liked.push(ad._id);
            });
        };

        $scope.unsubscribe = function(adId) {
            SubscribeFactory.unsubscribe(adId).then(function() {
                console.log("unsubscribe");
                var index1 = $scope.observeAds.map(function(ad) {return ad._id}).indexOf(adId);
                $scope.observeAds.splice(index1, 1);
                var index2 = $rootScope.user.liked.indexOf(adId);
                $rootScope.user.liked.splice(index2, 1);
            });
        };

        $scope.isSubscription = function(adId) {
            return ~$rootScope.user.liked.indexOf(adId);
        };

        $scope.deleteAd = function(adId) {
            AdFactory.deleteAd(adId).then(function() {
                var index1 = $scope.listMyAds.map(function(ad) {return ad._id}).indexOf(adId);
                $scope.listMyAds.splice(index1, 1);
                var index2 = $scope.listAds.map(function(ad) {return ad._id}).indexOf(adId);
                $scope.listAds.splice(index2, 1);
            });
        };

        function init() {
            var findText = $state.params.find;

            if(findText) {
                AdFactory.findAds(findText).then(function(response) {
                    $scope.listAds = response.data;
                    if(!$scope.listAds.length) {
                        $scope.notFoundError = "По Вашему запросу нет обьявлений (("
                    }
                });
            } else {
                AdFactory.getAds().then(function(response) {
                    $scope.listAds = response.data;

                    if($state.current.name === "app.profile") {
                        $scope.listMyAds = $scope.listAds.filter(function(ad) {
                            return ad.author === $rootScope.user._id;
                        });

                        $scope.observeAds = $scope.listAds.filter(function(ad) {
                            return ~$rootScope.user.liked.indexOf(ad._id);
                        });
                    }
                })
            }
        }

    }])
;