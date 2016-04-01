angular.module('compareApp').controller('mainController', function($scope, loginServ, $state) {
  loginServ.checkUser();
});
