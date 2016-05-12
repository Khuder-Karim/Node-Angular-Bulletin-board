/**
 * Created by Karim on 13.04.2016.
 */

angular.module('courseApp')

    .controller('AdCommentController', ['$scope', '$stateParams', '$state', 'AdFactory', function($scope, $stateParams, $state, AdFactory) {

        $scope.comment = {rating:5, text:""};

        $scope.submitComment = function () {
            AdFactory.postComment().save({id: $stateParams.id}, $scope.comment, function(response) {
                $scope.comment = {rating:5, text: ""};
                $state.reload();
            });
        };

        $scope.deleteComment = function(idCom) {
            AdFactory.delComment().remove({id: $stateParams.id, comId: idCom}, function(response) {
                $state.reload();
            });
        };

    }])
;