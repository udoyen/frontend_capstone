/****************************************************
 Product Service to get the product information from
 the API service
 ****************************************************/
'use strict';

angular.module('capstoneApp').service('productService', ['$window'], function($window, $http, $q) {
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
        $window.alert(data);

      })
      .then(function errorCallback(response) {
        $window.alert('There was an error: ' + response);
      });

      return deferred.promise;
  };
});
