angular.module('compareApp').service('compareInfoServ', function($http, $q, amazonDataService) {

  this.getInfo = function(keyword, pageNumber, number) {
    return $http({
      method: 'GET',
      url: '/api/compare/?item=' + keyword + '&page=' + number
    }).then(function(response) {
      return amazonDataService.prepareData(response.data);
    });
  };
});
