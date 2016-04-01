angular.module('compareApp')
.directive('modal', function() {
  return {
    controller: function($scope, modalDataService) {

      $scope.$on('activate modal', function() {
        $scope.modalData = modalDataService.get();
        console.log('IN MODAL DIRECTIVE', $scope.modalData);
        $scope.$digest();
      });

    },
    templateUrl: '../views/modal.html',
    replace: true,
    scope: true
  };
});
