angular.module('compareApp').service('wishlistServ', function($http, $q) {

  this.saveProduct = function(userData) {
    return $http({
      method: 'POST',
      url: '/api/product',
      data: {
        title: userData.title,
        brand: userData.brand,
        largeImage: userData.largeImage,
        thumbImage: userData.thumbImage,
        description: userData.description,
        listPrice: userData.listPrice,
        newPrice: userData.newPrice,
        usedPrice: userData.usedPrice,
        salesRank: userData.salesRank,
        productLink: userData.productLink
      }
    }).success(function(response) {
      return $http({
        method: 'PUT',
        url: '/api/users',
        data: {
          wishlist: response._id
        }
      }).success(function(response) {
        console.log(response);
      });
    });
  };

  this.getWishlist = function() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/api/wishlist'
    }).then(function(response) {
      if (!response) {
        deferred.reject('error');
      } else (
        deferred.resolve(response.data.wishlist)
      );
    });
    return deferred.promise;
  };

  this.deleteProduct = function(item) {
    console.log("item in serv", item);
    return $http({
      method: 'DELETE',
      url: '/api/product/delete/' + item
    }).success(function(resp) {
      return resp;
    });
  };

});
