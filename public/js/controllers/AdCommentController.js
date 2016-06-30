/**
 * Created by Karim on 13.04.2016.
 */

angular.module('courseApp')

    .controller('AdCommentController', ['$scope', '$stateParams', '$state', 'AdFactory', function($scope, $stateParams, $state, AdFactory) {

        $scope.comment = {rating:5, text:""};
        $scope.form = {};

        $scope.submitComment = function () {
            AdFactory.postComment($stateParams.id, $scope.comment).then(function(response) {
                $scope.ad.comments.push(response.data);
                $scope.comment = {rating:5, text: ""};

                $scope.form.commentForm.$setPristine();
            });
        };

        $scope.deleteComment = function(idCom) {
            AdFactory.deleteComment($stateParams.id, idCom).then(function() {
                var index = $scope.ad.comments.indexOf(idCom);
                $scope.ad.comments.splice(index, 1);
            });
        };

    }])
;