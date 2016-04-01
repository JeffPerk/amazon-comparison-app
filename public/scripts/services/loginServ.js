angular.module('compareApp').service('loginServ', function($q, $http, $state, loginVerificationService) {
var baseUrl = 'http://localhost:9000';
  this.register = function(email, username, password) {
    $http({
      method: 'POST',
      url: baseUrl + '/signup',
      data: {
        email: email,
        username: username,
        password: password
      }
    }).success(function() {
      $state.go('home');
    });
  };

  this.loginUser = function(email, password) {
    $http({
      method: 'POST',
      url: baseUrl + '/login',
      data: {
        email: email,
        password: password
      }
    }).success(function() {
      loginVerificationService.loginVerification = true;
      $state.go('home');
    });
  };

    this.checkUser = function() {
      return $http({
        method: 'GET',
        url: baseUrl + '/users'
      }).then(function(response) {
        if (response === 'error') {
          $state.go('login');
        }
      });
    };

    this.logoutUser = function() {
      loginVerificationService.loginVerification = false;
      return $http({
        method: 'GET',
        url: baseUrl + '/logout'
      });
    };
});
