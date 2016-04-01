angular.module('compareApp').controller('loginCtrl', function($scope, loginServ, loginVerificationService) {

  loginServ.checkUser();

  $scope.clickLogin = function(email, password) {
    loginServ.loginUser(email, password);
  };

  $scope.clickRegister = function(email, username, password) {
    loginServ.register(email, username, password);
  };

});
