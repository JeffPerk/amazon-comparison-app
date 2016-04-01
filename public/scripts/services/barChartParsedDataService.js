angular.module('compareApp').service('barChartParsedDataService', function() {

  this.prepareData = function(results) {
    var formattedResults = [];
    results.items.forEach(function(value) {
        formattedResults.push({
          title: value.title,
          thumbImage: value.images.thumbnail,
          largeImage: value.images.large,
          listPrice: value.listPrice,
          newPrice: value.offerNew,
          usedPrice: value.offerUsed,
          amountSaved: value.amountSave,
          salesRank: value.salesRank
        });
    });
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
  cleanArray.forEach(function(value) {
    // console.log("value2", value);
    finalParsedResults.push({
      title: value.title,
      salesRank: value.salesRank,
      thumbImage: value.thumbImage,
      largeImage: value.largeImage,
      listPrice: makeNumber(value.listPrice),
      newPrice: makeNumber(value.newPrice),
      usedPrice: makeNumber(value.usedPrice),
      amountSaved: makeNumber(value.amountSaved)
    });
  });
  // console.log("finalParsedResults", finalParsedResults);
  return top5(finalParsedResults);

  function top5(arr) {
    // console.log("arr", arr);
    var top5Array = [];
    for (var i = 0; i < 5; i++) {
      // if (!arr[i]) {
      //
      // }
      top5Array.push(arr[i]);
    }
    // console.log("top5Array", top5Array);
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
