angular.module('compareApp').service('amazonDataFetchingService', function($http, $q, barChartParsedDataService, $state) {

  this.getInfo = function(keyword, pageNumber, searchIndex) {
    return $http({
      method: 'GET',
      url: '/api/compare/?item=' + keyword + '&page=' + pageNumber + '&search=' + searchIndex
    }).success(function(resp) {
      if (typeof resp.redirect == 'string') {
        $state.go('login');
      }
    }).then(function(response) {
      return response.data;
      // return amazonDataService.prepareData(response.data);
    });
  };

  var searchIndices = [{
    value: 'All'
  },
  {
    value: 'UnboxVideo'
  },
  {
    value: 'Appliances'
  },
  {
    value: 'MobileApps'
  },
  {
    value: 'ArtsAndCrafts'
  },
  {
    value: 'Automotive'
  },
  {
    value: 'Baby'
  },
  {
    value: 'Beauty'
  },
  {
    value: 'Books'
  },
  {
    value: 'Music'
  },
  {
    value: 'Wireless'
  },
  {
    value: 'Fashion'
  },
  {
    value: 'FashionBaby'
  },
  {
    value: 'FashionBoys'
  },
  {
    value: 'FashionGirls'
  },
  {
    value: 'FashionMen'
  },
  {
    value: 'FashionWomen'
  },
  {
    value: 'Collectibles'
  },
  {
    value: 'PCHardware'
  },
  {
    value: 'MP3Downloads'
  },
  {
    value: 'Electronics'
  },
  {
    value: 'GiftCards'
  },
  {
    value: 'Grocery'
  },
  {
    value: "HealthPersonalCare"
  },
  {
    value: 'HomeGarden'
  },
  {
    value: 'Industrial'
  },
  {
    value: 'KindleStore'
  },
  {
    value: 'Luggage'
  },
  {
    value: 'Magazines'
  },
  {
    value: 'Movies'
  },
  {
    value: 'MusicalInstruments'
  },
  {
    value: 'OfficeProducts'
  },
  {
    value: 'LawnAndGarden'
  },
  {
    value: 'PetSupplies'
  },
  {
    value: 'Pantry'
  },
  {
    value: 'Software'
  },
  {
    value: 'SportingGoods'
  },
  {
    value: 'Tools'
  },
  {
    value: 'Toys'
  },
  {
    value: 'VideoGames'
  },
  {
    value: 'Wine'
  }
  ];
  this.getSearchIndex = function() {
    return searchIndices;
  };
});
