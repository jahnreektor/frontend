(function () {
  'use strict';

  angular.module('frontendApp').service('CampaignService', function ($q, $http, urls) {
    this.CONTRIBUTION = {
      PAC: 'PAC',
      BUSINESS: 'Business',
      GRASSROOTS: 'Grassroots',
      INDIVIDUAL: 'Individual',
      PARTY: 'Party',
      NA: 'NA'
    };

    var _cachedTransactions = {campaignId: null, transactions: null};

    this.searchCampaigns = function (searchTerm) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      $http.get(urls.campaignSearch(searchTerm))
        .then(function (result) {
          var campaigns = _(result.data).map(function(item){
            var campaign = new Campaign();
            campaign.fromObject(item);
            return campaign;
          }).value();
          deferred.resolve(campaigns);
        });

      return promise;
    };

    this.getCampaign = function (campaignId) {

      var deferred = $q.defer();
      var promise = deferred.promise;
      $http.get(urls.campaignDetail(campaignId))
        .then(function (result) {
          var campaign = new Campaign();
          campaign.fromObject(result.data[0]);
          deferred.resolve(campaign);
        });

      return promise;
    };

    this.getCampaignMoneyByState = function(campaignId){

      var deferred = $q.defer();
      var promise = deferred.promise;
      $http.get(urls.campaignMoneyByState(campaignId))
        .then(function (result) {
          deferred.resolve(result.data);
        });

      return promise;
    };
    /**
     * These results will get cached.  Each result could be many rows of data, so we'll only cache one
     * candidateId of results at a time.  Other service calls like getFinancialSummary will use the cached results.
     * @param campaignId
     * @returns {*}
     */
    this.getTransactions = function (campaignId) {

      var deferred = $q.defer();
      var promise = deferred.promise;
      if (campaignId === _cachedTransactions.campaignId) {
        deferred.resolve(_cachedTransaction.transactions);
      } else {
        $http.get(urls.transactions(campaignId))
          .then(function (result) {
            _cachedTransactions = {
              campaignId: campaignId,
              transactions: result.data
            };
            deferred.resolve(result.data);
          });
      }

      return promise;
    };

    this.getCampaignFinancialSummary = function (campaignId) {

      var deferred = $q.defer();
      var promise = deferred.promise;

      var sortEntry = function(a, b) {
        return Number(b.amount) - Number(a.amount);
      }

      var self = this;

      this.getTransactions(campaignId)
        .then(function (transactions) {
          var contributions = {};
          _(self.CONTRIBUTION).each(function(type){
            contributions[type] = {amount:0,number:0};
          });
          var expenditures = {};
          var donors = {
            indiv: {},
            corp: {}
          }

          // Use contributor name as a unique key to add up total donations for each contributor
          var addDonorItem = function(type, row) {
            var payee = row['contributor_payee'];
            if (! _.has(donors[type], payee)){
              donors[type][payee] = 0;
            }
            donors[type][payee] += row.amount;
          };

          _(transactions).chain()
            .each(function (row) {
              var subType = row['sub_type'];
              switch (subType) {
                case 'Cash Contribution':
                  var bookType = row['book_type'];
                  var contributionKey = '';
                  switch (bookType) {
                    case 'Business Entity':
                      contributionKey = self.CONTRIBUTION.BUSINESS;
                      addDonorItem('corp', row);
                      break;
                    case 'Political Committee':
                      contributionKey = self.CONTRIBUTION.PAC;
                      break;
                    case 'Political Party Committee':
                      contributionKey = self.CONTRIBUTION.PARTY;
                      break;
                    case 'NA':
                      contributionKey = self.CONTRIBUTION.NA;
                      break;
                    case 'Individual':
                      if (Number(row['amount']) <= 200) {
                        contributionKey = self.CONTRIBUTION.GRASSROOTS;
                      } else {
                        contributionKey = self.CONTRIBUTION.INDIVIDUAL;
                        addDonorItem('indiv', row);
                      }
                      break;
                  }
                  if (contributionKey) {
                    contributions[contributionKey].amount += Number(row['amount']);
                    contributions[contributionKey].number += 1;
                  }
                  break;
                case 'Cash Expenditure':
                  var purposeCodes = (row['purpose_codes'] || '').split('; ');
                  _(purposeCodes).each(function (purposeCode) {
                    if (!_(expenditures).has(purposeCode)) {
                      expenditures[purposeCode] = 0;
                    }
                    expenditures[purposeCode] += Number(row['amount']);
                  });
                  break;

              }
            });

          donors.indiv = _.map(donors.indiv, function(amount, donor){
            return {payee: donor, amount: amount};
          });
          donors.indiv.sort(sortEntry);

          donors.corp = _.map(donors.corp, function(amount, donor){
            return {payee: donor, amount: amount};
          });
          donors.corp.sort(sortEntry);

          deferred.resolve({contributions:contributions,expenditures:expenditures, donors: donors});
      });

      return promise;
    };


    return this;
  });

}).call(this);
