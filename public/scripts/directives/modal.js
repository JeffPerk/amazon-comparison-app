angular.module('compareApp')
.directive('modal', function() {
  return {
    controller: function($scope, modalDataService, wishlistServ) {

      $scope.$on('activate modal', function() {
        $scope.modalData = modalDataService.get();
        console.log('modalData', $scope.modalData);
        $scope.features = $scope.modalData.feature;
        // wishlistServ.getUserProduct($scope.modalData);
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
