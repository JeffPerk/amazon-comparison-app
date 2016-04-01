angular.module('compareApp').factory('modalDataService', function($rootScope) {

  var service = {};
  service.set = function(data) {
    this.data = data;
    $rootScope.$broadcast('activate modal');
  };

  service.get = function() {
    return this.data;
  };

  return service;


});
