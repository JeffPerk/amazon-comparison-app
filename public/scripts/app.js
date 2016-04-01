angular.module('compareApp', ['ui.router'])
.config(function($stateProvider, $httpProvider, $urlRouterProvider) {
$urlRouterProvider
  .otherwise('login');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '../views/homeTmpl.html',
    })
    .state('login', {
      url: '/login',
      templateUrl: '../views/loginTmpl.html'
      // controller: 'loginCtrl'
    });
    // .state('product', {
    //   url: '/poduct/:productId',
    //   templateUrl: '../views/product.html'
    // });


});
