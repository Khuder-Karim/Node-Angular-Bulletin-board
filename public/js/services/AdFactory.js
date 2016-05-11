/**
 * Created by Karim on 12.04.2016.
 */

angular.module('courseApp')
    .constant('baseURL', "http://localhost:3000/")
    .service('AdFactory', ['$http', '$state', '$resource', 'baseURL', function($http, $state, $resource, baseURL) {

        this.getAds = function() {
            return $resource(baseURL+'ad/:id', null,
                {'remove': {method: 'DELETE'}});
        };

        this.post = function(data) {
            var fd = new FormData();

            for(var key in data)
                fd.append(key, data[key]);

            $http.post(baseURL+'ad/', fd, {
                transformRequest: angular.indentity,
                headers: { 'Content-Type': undefined }
            }).then(
                function() {
                    $state.go('app');
                },
                function(err) {
                    console.log(err.status + ' ' + err.statusText);
                }
            );
        };

        this.postComment = function() {
            return $resource(baseURL+'ad/:id/comment');
        };

    }])
;