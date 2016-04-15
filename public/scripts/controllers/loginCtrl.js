angular.module('compareApp').controller('loginCtrl', function($scope, loginServ, loginVerificationService) {
  

  $scope.checkUser = function() {
    loginServ.checkUser().then(function(resp) {
      $scope.userId = resp;
    });
  };

  $scope.clickLogin = function(email, password) {
    loginServ.loginUser(email, password);
  };

  $scope.clickRegister = function(email, username, password) {
    loginServ.register(email, username, password);
  };


});
