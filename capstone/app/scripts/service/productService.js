/****************************************************
 Product Service to get the product information from
 the API service
 ****************************************************/
'use strict';
// TODO: Clean up this file
angular.module('capstoneApp').service('productService', function($window, $http, $q) {
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
      .then(function successCallback(response) {
        deferred.resolve(response);
        console.log("Success: " + JSON.stringify(response.data));

      }),
      (function errorCallback(response) {
        console.log('There was an error: ' + response);
      });

      return deferred.promise;
  };
});
