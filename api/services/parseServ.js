var amazon = require('../controllers/amazonCtrl.js');
var _ = require('underscore');
var q = require('q');

module.exports.parseResults = function(results) {
    var deferred = q.defer();
    var overview = results.ItemSearchResponse.Items[0].Item;
    var itemsOverview = {
        keyword: results.ItemSearchResponse.Items[0].Request[0].ItemSearchRequest[0].Keywords[0],
        searchIndex: results.ItemSearchResponse.Items[0].Request[0].ItemSearchRequest[0].SearchIndex[0],
        totalResults: results.ItemSearchResponse.Items[0].TotalResults[0],
        totalPages: results.ItemSearchResponse.Items[0].TotalPages[0],
        more: results.ItemSearchResponse.Items[0].MoreSearchResultsUrl[0],
        items: getItems(overview)
    };

    function getItems(data) {
        var item = [];
        data.map(function(k, i) {
            var attributes = k.ItemAttributes[0];
            var offerSummary = k.OfferSummary[0];
            var offer = validateOffer(k);
            var customerReviews = validateCustomerReviews(k);
            var editorialReviews = validateEditReviews(k);
            // var editorialReviews = i.EditorialReviews[0].EditorialReview[0];
            item.push({
                brand: validateBrand(attributes),
                productLink: validateProductLink(k),
                images: {
                    thumbnail: validateImage(k),
                    large: validateLargeImage(k)
                },
                // itemDimensions: {
                //     height: attributes.ItemDimensions[0].Height[0] || 0,
                //     width: attributes.ItemDimensions[0].Width[0],
                //     length: attributes.ItemDimensions[0].Length[0],
                //     weight: attributes.ItemDimensions[0].Weight[0]
                // },

                listPrice: getListPrice(attributes),
                title: attributes.Title[0],
                description: editorialReviews,
                manufacturer: validateManufacturer(attributes),
                feature: attributes.Feature,
                salesRank: validateSalesRank(k),
                offerNew: validateOfferNew(offerSummary),
                totalNew: validateTotalNew(offerSummary),
                totalUsed: validateTotalUsed(offerSummary),
                offerUsed: validateOfferUsed(offerSummary),
                amountSaved: getAmountSaved(offer),
                percentageSaved: getPercentageSaved(offer),
                customerReview: validateCustomerReview(customerReviews),
                productGroup: attributes.ProductGroup[0],
                productTypeName: attributes.ProductTypeName[0],

            });
        });
        return item;
    }

    function validateTotalUsed(offerSummary) {
      if (offerSummary.TotalUsed && offerSummary.TotalUsed[0]) {
        return offerSummary.TotalUsed[0];
      } else {
        return offerSummary.TotalUsed;
      }
    }

    function validateTotalNew(offerSummary) {
      if (offerSummary.TotalNew && offerSummary.TotalNew[0]) {
        return offerSummary.TotalNew[0];
      } else {
        return offerSummary.TotalNew;
      }
    }

    function validateLargeImage(i) {
      if (i.ImageSets && i.ImageSets[0] && i.ImageSets[0].ImageSet && i.ImageSets[0].ImageSet[0] && i.ImageSets[0].ImageSet[0].LargeImage && i.ImageSets[0].ImageSet[0].LargeImage[0] && i.ImageSets[0].ImageSet[0].LargeImage[0].URL && i.ImageSets[0].ImageSet[0].LargeImage[0].URL[0]) {
        return i.ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
      } else if (i.ImageSets && i.ImageSets[0] && i.ImageSets[0].ImageSet && i.ImageSets[0].ImageSet[0] && i.ImageSets[0].ImageSet[0].LargeImage && i.ImageSets[0].ImageSet[0].LargeImage[0] && i.ImageSets[0].ImageSet[0].LargeImage[0].URL) {
        return i.ImageSets[0].ImageSet[0].LargeImage[0].URL;
      } else if (i.ImageSets && i.ImageSets[0] && i.ImageSets[0].ImageSet && i.ImageSets[0].ImageSet[0] && i.ImageSets[0].ImageSet[0].LargeImage && i.ImageSets[0].ImageSet[0].LargeImage[0]) {
        return i.ImageSets[0].ImageSet[0].LargeImage[0];
      } else if (i.ImageSets && i.ImageSets[0] && i.ImageSets[0].ImageSet && i.ImageSets[0].ImageSet[0] && i.ImageSets[0].ImageSet[0].LargeImage) {
        return i.ImageSets[0].ImageSet[0].LargeImage;
      }
    }

    function validateImage(i) {
      if (i.ImageSets && i.ImageSets[0] && i.ImageSets[0].ImageSet && i.ImageSets[0].ImageSet[0] && i.ImageSets[0].ImageSet[0].ThumbnailImage && i.ImageSets[0].ImageSet[0].ThumbnailImage[0] && i.ImageSets[0].ImageSet[0].ThumbnailImage[0].URL && i.ImageSets[0].ImageSet[0].ThumbnailImage[0].URL[0]) {
        return i.ImageSets[0].ImageSet[0].ThumbnailImage[0].URL[0];
      } else if (i.ImageSets && i.ImageSets[0] && i.ImageSets[0].ImageSet && i.ImageSets[0].ImageSet[0] && i.ImageSets[0].ImageSet[0].ThumbnailImage && i.ImageSets[0].ImageSet[0].ThumbnailImage[0] && i.ImageSets[0].ImageSet[0].ThumbnailImage[0].URL) {
        return i.ImageSets[0].ImageSet[0].ThumbnailImage[0].URL;
      } else if (i.ImageSets && i.ImageSets[0] && i.ImageSets[0].ImageSet && i.ImageSets[0].ImageSet[0] && i.ImageSets[0].ImageSet[0].ThumbnailImage && i.ImageSets[0].ImageSet[0].ThumbnailImage[0] && i.ImageSets[0].ImageSet[0].ThumbnailImage[0]) {
        return i.ImageSets[0].ImageSet[0].ThumbnailImage[0];
      } else if (i.ImageSets && i.ImageSets[0] && i.ImageSets[0].ImageSet && i.ImageSets[0].ImageSet[0] && i.ImageSets[0].ImageSet[0].ThumbnailImage && i.ImageSets[0].ImageSet[0].ThumbnailImage[0] && i.ImageSets[0].ImageSet[0].ThumbnailImage) {
        return i.ImageSets[0].ImageSet[0].ThumbnailImage;
      }
    }

    function validateOfferNew(offerSummary) {
      if (offerSummary.LowestNewPrice && offerSummary.LowestNewPrice[0] && offerSummary.LowestNewPrice[0].FormattedPrice && offerSummary.LowestNewPrice[0].FormattedPrice[0]) {
        return offerSummary.LowestNewPrice[0].FormattedPrice[0];
      } else if (offerSummary.LowestNewPrice && offerSummary.LowestNewPrice[0] && offerSummary.LowestNewPrice[0].FormattedPrice) {
        return offerSummary.LowestNewPrice[0].FormattedPrice;
      } else if (offerSummary.LowestNewPrice && offerSummary.LowestNewPrice[0]) {
        return offerSummary.LowestNewPrice[0];
      } else {
        return offerSummary.LowestNewPrice;
      }
    }

    function validateCustomerReview(customerReviews) {
      if (customerReviews && customerReviews.IFrameURL && customerReviews.IFrameURL[0]) {
        return customerReviews.IFrameURL[0];
      } else if (customerReviews && customerReviews.IFrameURL) {
        return customerReviews.IFrameURL;
      } else {
        return customerReviews;
      }
    }

    function validateCustomerReviews(i) {
      if (i.CustomerReviews && i.CustomerReviews[0]) {
        clean = i.CustomerReviews[0];
      } else {
        clean = i.CustomerReviews;
      }
    }

    function validateProductLink(i) {
      if (i.DetailPageURL && i.DetailPageURL[0]) {
        return i.DetailPageURL[0];
      } else {
        return i.DetailPageURL;
      }
    }

    function validateSalesRank(i) {
      if (i.SalesRank && i.SalesRank[0]) {
        return i.SalesRank[0];
      } else {
        return i.SalesRank;
      }
    }

    function validateBrand(attributes) {
      if(attributes.Brand && attributes.Brand[0]) {
        return attributes.Brand[0];
      } else {
        return attributes.Brand;
      }
    }

    function validateManufacturer(attributes) {
      if(attributes.Manufacturer && attributes.Manufacturer[0]) {
        return attributes.Manufacturer[0];
      } else {
        return attributes.Manufacturer;
      }
    }

    function validateEditReviews(i) {
      if(i.EditorialReviews && i.EditorialReviews[0] && i.EditorialReviews[0].EditorialReview && i.EditorialReviews[0].EditorialReview[0] && i.EditorialReviews[0].EditorialReview[0].Content && i.EditorialReviews[0].EditorialReview[0].Content[0]) {
        clean = i.EditorialReviews[0].EditorialReview[0].Content[0];
      } else if(i.EditorialReviews && i.EditorialReviews[0] && i.EditorialReviews[0].EditorialReview && i.EditorialReviews[0].EditorialReview[0] && i.EditorialReviews[0].EditorialReview[0].Content) {
        clean = i.EditorialReviews[0].EditorialReview[0].Content;
      } else if (i.EditorialReviews && i.EditorialReviews[0] && i.EditorialReviews[0].EditorialReview && i.EditorialReviews[0].EditorialReview[0]) {
        clean = i.EditorialReviews[0].EditorialReview[0];
      } else if(i.EditorialReviews && i.EditorialReviews[0] && i.EditorialReviews[0].EditorialReview){
        clean = i.EditorialReviews[0].EditorialReview;
      } else if(i.EditorialReviews && i.EditorialReviews[0]) {
        clean = i.EditorialReviews[0];
      } else {
        clean = i.EditorialReviews;
      }
      return clean;
    }

    function validateOffer(i) {
      if(i.Offers && i.Offers[0] && i.Offers[0].Offer && i.Offers[0].Offer[0].OfferListing[0]) {
        clean = i.Offers[0].Offer[0].OfferListing[0];
      } else if(i.Offers && i.Offers[0].Offer && i.Offers[0].Offer[0].OfferListing) {
        clean = i.Offers[0].Offer[0].OfferListing;
      } else if(i.Offers && i.Offers[0].Offer && i.Offers.Offer[0]) {
         clean = i.Offers[0].Offer[0];
      } else if(i.Offers && i.Offers[0].Offer){
         clean = i.Offers[0].Offer;
      } else if (i.Offers && i.Offers[0]){
        clean = i.Offers[0];
      } else {
        clean = i.Offer;
      }
      return clean;
    }

    function validateOfferUsed(offerSummary) {
        if(offerSummary.LowestUsedPrice && offerSummary.LowestUsedPrice[0]) {
           return offerSummary.LowestUsedPrice[0].FormattedPrice[0];
        } else if(offerSummary.LowestUsedPrice) {
            return offerSummary.LowestUsedPrice;
        } else {
          return offerSummary.LowestUsedPrice;
        }
    }

    function getListPrice(attributes) {
        if(attributes.ListPrice && attributes.ListPrice[0] && attributes.ListPrice[0].FormattedPrice[0]) {
           return attributes.ListPrice[0].FormattedPrice[0];
        } else if(attributes.ListPrice && attributes.ListPrice[0] && attributes.ListPrice[0].FormattedPrice) {
            return attributes.ListPrice[0].FormattedPrice;
        } else if(attributes.ListPrice && attributes.ListPrice[0]){
          return attributes.ListPrice[0];
        } else {
          return attributes.ListPrice;
        }
    }

    function getAmountSaved(offer) {
        if(offer.AmountSaved && offer.AmountSaved[0] && offer.AmountSaved[0].FormattedPrice[0]) {
           return offer.AmountSaved[0].FormattedPrice[0];
        } else if(offer.AmountSaved && offer.AmountSaved[0] && offer.AmountSaved[0].FormattedPrice) {
            return offer.AmountSaved[0].FormattedPrice;
        } else if(offer.AmountSaved && offer.AmountSaved[0]) {
            return offer.AmountSaved[0];
        } else {
          return offer.AmountSaved;
        }
    }

    function getPercentageSaved(offer) {
        if(offer.PercentageSaved && offer.PercentageSaved[0]) {
           return offer.PercentageSaved[0];
        } else {
          return offer.PercentageSaved;
        }
    }


    deferred.resolve(itemsOverview);
    // deferred.resolve(results);

    return deferred.promise;
};
