angular.module('compareApp')
.directive('modal', function() {
  return {
    controller: function($scope, modalDataService, wishlistServ) {

      $scope.$on('activate modal', function() {
        $scope.modalData = modalDataService.get();
        $scope.features = $scope.modalData.feature;
        $scope.$digest();
      });

      $scope.saveProduct = function() {
        wishlistServ.saveProduct($scope.modalData);
        };


    },
    templateUrl: '../views/modal.html',
    replace: true,
    scope: true
  };
});
