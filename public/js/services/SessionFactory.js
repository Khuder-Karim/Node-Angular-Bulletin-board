/**
 * Created by Karim on 11.04.2016.
 */
angular.module('courseApp')
    .constant('baseURL', "http://localhost:3000/")

    .service('SessionFactory', ['$resource', '$rootScope', 'baseURL', function($resource, $rootScope, baseURL) {
        this.getSession = function() {
            $resource(baseURL+'session').get()
                .$promise.then(
                    function(response) {
                        if(response.username)
                            $rootScope.user = response;
                        else
                            $rootScope.user = null;
                    },
                    function() {
                        $rootScope.user = null;
                    }
            );
        };
    }])
;