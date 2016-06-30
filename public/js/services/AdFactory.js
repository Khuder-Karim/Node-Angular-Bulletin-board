/**
 * Created by Karim on 12.04.2016.
 */

angular.module('courseApp')

    .service('AdFactory', ['$http', '$state', '$rootScope', function($http, $state, $rootScope) {

        this.getAds = function() {
            return $http.get('/ad');
        };

        this.getAdDetails = function(id) {
            return $http.get('/ad/'+id);
        };

        this.findAd = function(findText) {
            return $http.get('/ad', {params: {find: findText}});
        };

        this.deleteAd = function(id) {
            return $http.delete('/ad/'+id);
        };

        this.post = function(data) {
            var fd = new FormData();

            for(var key in data)
                fd.append(key, data[key]);

            return $http.post('/ad', fd, {
                transformRequest: angular.indentity,
                headers: { 'Content-Type': undefined }
            });
        };

        this.postChange = function(data, id) {
            var fd = new FormData();

            for(var key in data)
                fd.append(key, data[key]);

            return $http.put('/ad/'+id, fd, {
                transformRequest: angular.indentity,
                headers: { 'Content-Type': undefined }
            });
        };

        this.postComment = function(id, comment) {
            return $http.post('/ad/'+id+'/comment', comment);
        };

        this.deleteComment = function(idAd, idComment) {
            return $http.delete('/ad/'+idAd+'/comment/'+idComment);
        };

    }])
;