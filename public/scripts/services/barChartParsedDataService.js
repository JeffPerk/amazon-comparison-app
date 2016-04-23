angular.module('compareApp').service('barChartParsedDataService', function() {

  this.prepareData = function(results) {
    var formattedResults = [];
    try {
    results.items.forEach(function(value) {
        formattedResults.push({
          title: value.title,
          description: value.description,
          brand: value.brand,
          feature: value.feature,
          thumbImage: value.images.thumbnail,
          largeImage: value.images.large,
          productLink: value.productLink,
          listPrice: value.listPrice,
          newPrice: value.offerNew,
          usedPrice: value.offerUsed,
          amountSaved: value.amountSave,
          salesRank: value.salesRank
        });
    });
  } catch (err) {
    return err;
  }
  var cleanArray = [];
  formattedResults.forEach(function(value) {
    if(value.listPrice && value.newPrice && value.salesRank) {
      cleanArray.push(value);
    }
  });

  cleanArray.sort(function(a, b) {
    return a.salesRank - b.salesRank;
  });

  var finalParsedResults = [];
  try {
  cleanArray.forEach(function(value) {
    finalParsedResults.push({
      title: value.title,
      description: value.description,
      brand: value.brand,
      salesRank: value.salesRank,
      feature: value.feature,
      thumbImage: value.thumbImage,
      largeImage: value.largeImage,
      productLink: value.productLink,
      listPrice: makeNumber(value.listPrice),
      newPrice: makeNumber(value.newPrice),
      usedPrice: makeNumber(value.usedPrice),
      amountSaved: makeNumber(value.amountSaved)
    });
  });
} catch (err) {
  return err;
}
  return top5(finalParsedResults);

  function top5(arr) {
    var top5Array = [];
    for (var i = 0; i < 5; i++) {
      // if (!arr[i]) {
      //
      // }
      top5Array.push(arr[i]);
    }
    return top5Array;
  }
  };
    // return determineTopFive(formattedResults);
  });
  function makeNumber(value) {
    if(value) {
      return +(value.replace(/[$]/g, ""));
    } else {
      return 0;
    }
  }

  // function determineTopFive(arr) {
  //   if()
  // }
// });
