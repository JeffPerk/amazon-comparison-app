angular
.module('compareApp')
.controller('barChartController', function($scope, $state, modalDataService) {

  $scope.goToView = function(data) {
    // $scope.productData = data;
    modalDataService.set(data);
  };




});
