/**
 * Created by Karim on 12.04.2016.
 */

angular.module('courseApp')

    .service('AdFactory', ['$http', '$state', '$resource', 'baseURL', function($http, $state, $resource, baseURL) {

        this.getAds = function() {
            return $resource(baseURL+'ad/:id', null,
                {'remove': {method: 'DELETE'}})
            ;
        };

        this.post = function(url, data) {
            var fd = new FormData();

            for(var key in data)
                fd.append(key, data[key]);

            $http.post(baseURL+url, fd, {
                transformRequest: angular.indentity,
                headers: { 'Content-Type': undefined }
            }).then(
                function() {
                    $state.go('app.profile');
                },
                function(err) {
                    console.log(err.status + ' ' + err.statusText);
                }
            );
        };

        this.postChange = function(url, data) {
            var fd = new FormData();

            for(var key in data)
                fd.append(key, data[key]);

            $http.put(baseURL+url, fd, {
                transformRequest: angular.indentity,
                headers: { 'Content-Type': undefined }
            }).then(
                function() {
                    $state.go('app.profile');
                },
                function(err) {
                    console.log(err.status + ' ' + err.statusText);
                }
            );
        };

        this.postComment = function() {
            return $resource(baseURL+'ad/:id/comment');
        };

        this.delComment = function() {
            return $resource(baseURL+'ad/:id/comment/:comId', null,
                {'remove': {method: 'DELETE'}});
        };

    }])
;