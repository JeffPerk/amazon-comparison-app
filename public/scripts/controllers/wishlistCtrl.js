angular.module('compareApp').controller('wishlistCtrl', function($scope, wishlistServ, wishlistData) {
  $scope.saveProduct = function() {
    wishlistServ.saveProduct().then(function(response) {
      var id = response;
    }
  )};

  if (wishlistData) {
    $scope.wishlist = wishlistData;
  }

  $scope.deleteProduct = function(item) {
    console.log("delete item", item);
    wishlistServ.deleteProduct(item).then(function() {
      wishlistServ.getWishlist().then(function(resp) {
        $scope.wishlist = resp;
      });
    });
  };

});
