/****************************************************
 Product Service to get the product information from
 the API service
 ****************************************************/
'use strict';

angular.module('capstoneApp').service('productService', function($http, $q) {
  var baseUrl =
    'https://webmppcapstone.blob.core.windows.net/data/itemsdata.json';
  this.getProducts = function() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: baseUrl,
      dataType: 'json',
      cache: true
    })
      .then(function successCallback(data) {
        deferred.resolve(data);
        return deferred.promise;
      })
      .then(function errorCallback(response) {
        return deferred.reject('There was an error: ' + response);
      });
  };
});
