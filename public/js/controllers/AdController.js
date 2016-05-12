/**
 * Created by Karim on 12.04.2016.
 */

angular.module('courseApp')

    .controller('AdController', ['$scope', '$rootScope', '$state', 'AdFactory', 'SubscribeFactory', 'SessionFactory', function($scope, $rootScope, $state, AdFactory, SubscribeFactory, SessionFactory) {
        $scope.adSchema = {};
        $scope.findText = "";
        $scope.noMyAds = "";
        $scope.noObserveAds = "";

        AdFactory.getAds().query(
            function(response) {
                $scope.ads = response;
                $scope.MyAds = $rootScope.user ?
                    $scope.ads.filter(function(ad) {
                        return ad.author == $rootScope.user._id;
                    })
                    : {}
                ;
                $scope.ObserveAd = $rootScope.user ?
                    $scope.ads.filter(function(ad) {
                        return $rootScope.user.liked.indexOf(ad._id) > -1
                    })
                    : {}
                ;
                if($scope.MyAds.legth == 0)
                    $scope.noMyAds = "Вы пока не создали обьявления";
                if($scope.ObserveAd.length == 0)
                    $scope.noObserveAds = "У Вас пока нет избранных обьявлений";
            },
            function(response) {
                console.log("Error: " + response.status + " " + response.statusText);
            }
        );

        $scope.Submit = function() {
            if(parseInt($scope.adSchema.price)) {
                AdFactory.post("ad/", $scope.adSchema);
            } else {
                $scope.errorMessage = "Enter correct price";
            }
        };

        $scope.subscribe = function(adId) {
            SubscribeFactory.subscribe().save({id: adId}, {}, function() {
                console.log("subscribe");
                SessionFactory.getSession();
                $state.reload();
            });
        };

        $scope.unsubscribe = function(adId) {
            SubscribeFactory.unsubscribe().save({id: adId}, {}, function() {
                console.log("unsubscribe");
                SessionFactory.getSession();
                $state.reload();
            });
        };

        $scope.isSubscription = function(adId) {
            return ~$rootScope.user.liked.indexOf(adId);
        };

        $scope.deleteAd = function(adId) {
            AdFactory.getAds().remove({id: adId})
                .$promise.then(function() {
                    $state.reload();
                })
            ;
        };

        $scope.find = function() {
            AdFactory.getAds().query({find: $scope.findText}, function(response) {
                $scope.ads = response;
            });
        };

    }])
;