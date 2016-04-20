var util = require('util');
var OperationHelper = require('apac').OperationHelper;
var _ = require('underscore');
var parseServ = require('../services/parseServ.js');
// var secret = require('../../secrets.js');

module.exports = {
    getProducts: function(req, res) {
    var opHelper = new OperationHelper({
        awsId:     process.env.ID,
        awsSecret: process.env.AWSSECRET,
        assocId:   process.env.ASSOCID,
        version:   '2013-08-01'
    });
    opHelper.execute('ItemSearch', {
        'SearchIndex': req.query.search,
        'Keywords': req.query.item,
        //'ResponseGroup': 'ItemAttributes,Offers,SalesRank,Reviews,Images,VariationSummary',
        'ResponseGroup': 'Large',
        'ItemPage': req.query.page
        // 'Sort': 'reviewrank_authority'
    }, function(err, results) {
        parseServ.parseResults(results).then(function(response) {
            res.status(200).json(response);
        });
        // res.status(200).send(results);
    });

  }
};
