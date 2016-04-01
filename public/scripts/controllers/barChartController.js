angular
.module('compareApp')
.controller('barChartController', function($scope, $state, modalDataService) {

  $scope.goToView = function(data) {
    // $scope.productData = data;
    console.log("scope", $scope.productData);
    modalDataService.set(data);
  };




});
