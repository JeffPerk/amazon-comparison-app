angular
.module('compareApp')
.controller('amazonDataController', function($scope, amazonDataFetchingService, $anchorScroll, $location, loginServ, barChartParsedDataService, productCardParsedDataService, loginVerificationService) {
  $scope.showLoader = false;
  $scope.showSearch = false;

  $scope.getInfo = function(keyword, searchIndex) {
    $scope.showLoader = true;
    var resultsArray = [];
    var pageNumber = 1;
    amazonDataFetchingService.getInfo(keyword, pageNumber, searchIndex).then(function(response) {
      $scope.barChartData = barChartParsedDataService.prepareData(response);
      // $scope.cardData = productCardParsedDataService.parseCardData(response);
      $location.hash("tf-about");
      $scope.keyword = '';
      $scope.showLoader = false;
      $scope.showSearch = true;
      $anchorScroll();
    });
  };

  $scope.logoutUser = function() {
    $scope.loginCheck = false;
    loginServ.logoutUser();
  };

  $scope.modalData = {};

  $scope.searchIndices = amazonDataFetchingService.getSearchIndex();
  // console.log("searchIndices", $scope.searchIndices);
  if(!$scope.searchIndex) {
    $scope.searchIndex = "All";
  }


});
