angular.module('compareApp').controller('compareInfoCtrl', function($scope, compareInfoServ) {
  $scope.showLoader = false;

  $scope.getInfo = function($stateParams, keyword) {
    $scope.showLoader = true;
    var resultsArray = [];
    var pageNumber = 1;
    compareInfoServ.getInfo($stateParams, keyword, pageNumber).then(function(response) {
      // pageNumber++;
      resultsArray.push(response);
      // compareInfoServ.getInfo($stateParams, keyword, pageNumber).then(function(response) {
      //   resultsArray.push(response);
      //   // console.log(response);
      // });
      // console.log(resultsArray);
      $scope.showLoader = false;
      $scope.data = response;
    });
  };


});
