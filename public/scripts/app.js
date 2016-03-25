angular.module('compareApp', ['ui.router'])
.config(function($stateProvider, $httpProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise('login');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '../views/homeTmpl.html',
      controller: 'compareInfoCtrl'
    })
    .state('compareInfo', {
      url:'/compareInfo',
      templateUrl: '../views/speedballTmpl.html',
      controller: 'compareInfoCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '../views/loginTmpl.html'
    });


});
