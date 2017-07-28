angular.module('App.MenuCtrl', [])
.controller('MenuCtrl', function($scope){
  $ionicModal.fromTemplateUrl('templates/modals/filter-model.html', {
      scope: $scope,
      animation: 'slide-in-down'
      }).then(function(modal) {
      $scope.modal = modal;
      });
      $scope.openfilterModal = function() {
      $scope.modal.show();
      };
      $scope.closefilterModal = function() {
      $scope.modal.hide();
      };
})
