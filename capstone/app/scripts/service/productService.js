/****************************************************
 Product Service to get the product information from
 the API service
 ****************************************************/
'use strict';
// TODO: Clean up this file
angular
  .module('capstoneApp')
  .service('productService', function($window, $http, $q) {
    var baseUrl =
      'https://webmppcapstone.blob.core.windows.net/data/itemsdata.json';
      var resultArray = [];
    this.getProducts = function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: baseUrl,
        dataType: 'json',
        cache: true
      })
        .then(function successCallback(response) {
          deferred.resolve(response.data);
          // angular.forEach(JSON.parse(response.data), function (value, key) {
          //   this.push(key + ': ' + value);
          // }, resultArray);
          // console.log(resultArray);
          // console.log(response.data);
        })
        .catch(function (e) {
          console.log('There was an error: ' + JSON.stringify(e));
        });

      return deferred.promise;
    };
  });
