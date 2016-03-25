angular.module('compareApp').service('amazonDataService', function() {

  this.prepareData = function(results) {
    // console.log("prepareDataResults",results.items);
    var formattedResults = [];
    results.items.forEach(function(value) {
        // console.log("value1", value);
        formattedResults.push({
          title: value.title,
          listPrice: value.listPrice,
          newPrice: value.offerNew,
          usedPrice: value.offerUsed,
          amountSaved: value.amountSave,
          salesRank: value.salesRank
        });
    });
  console.log("formattedResults", formattedResults);
  var cleanArray = [];
  formattedResults.forEach(function(value) {
    if(value.listPrice && value.newPrice && value.salesRank) {
      cleanArray.push(value);
    }
  });
  console.log("cleanResults", cleanArray);
  var finalResults = [];
  cleanArray.forEach(function(value) {
    // console.log("value2", value);
    finalResults.push({
      title: value.title,
      listPrice: makeNumber(value.listPrice),
      newPrice: makeNumber(value.newPrice),
      usedPrice: makeNumber(value.usedPrice),
      amountSaved: makeNumber(value.amountSaved)
    });
  });
    // console.log(finalResults);
    return finalResults;
  };
    // return determineTopFive(formattedResults);
  });
  function makeNumber(value) {
    // console.log("value3", value);
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
