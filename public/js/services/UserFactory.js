/**
 * Created by Karim on 10.04.2016.
 */

angular.module('courseApp')

    .service('UserFactory', ['$http', function($http) {
        this.login = function(client) {
            return $http.post('/user/login', client);
        };
        this.logout = function() {
            return $http.post('/user/logout');
        };

        this.register = function(newClient) {
            return $http.post('/user', newClient);
        };
    }])
;