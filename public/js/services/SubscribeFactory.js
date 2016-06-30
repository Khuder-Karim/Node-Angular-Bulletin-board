/**
 * Created by Karim on 14.04.2016.
 */
angular.module('courseApp')
    .service('SubscribeFactory', ['$http', function($http) {

        this.subscribe = function(id) {
            return $http.post('/ad/'+id+'/subscribe');
        };

        this.unsubscribe = function(id) {
            return $http.post('/ad/'+id+'/unsubscribe');
        };

    }])
;