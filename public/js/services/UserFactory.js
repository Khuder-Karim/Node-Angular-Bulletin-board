/**
 * Created by Karim on 10.04.2016.
 */

angular.module('courseApp')

    .constant('baseURL', "http://localhost:3000/")

    .service('UserFactory', ['$resource', 'baseURL', function($resource, baseURL) {
        this.logout = function() {
            return $resource(baseURL+'logout');
        };

        this.login = function() {
            return $resource(baseURL+'login');
        };

        this.register = function() {
            return $resource(baseURL+'user');
        };
    }])
;