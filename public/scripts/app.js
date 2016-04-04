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
    })
    .state('wishlist', {
      url: '/wishlist',
      templateUrl: '../views/wishlistTmpl.html',
      controller: 'wishlistCtrl',
      resolve: {
        wishlistData: function(wishlistServ) {
          return wishlistServ.getWishlist();
        }
      }
    });


});
