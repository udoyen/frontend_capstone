/****************************************************
 Product Service to get the product information from
 the API service
 ****************************************************/

angular.module("capstoneApp").service("productService", function($http, $q) {
  var baseUrl =
      "https://webmppcapstone.blob.core.windows.net/data/itemsdata.json";
  this.getProducts = function() {
    var deferred = $q.defer();
    $http({
      method: "GET",
      url: baseUrl,
      dataType: 'json'
    })
      .then(function successCallback(data) {
        deferred.resolve(data);
      })
      ,(function errorCallback(response) {
        deferred.reject("There was an error: " + response);
      });

      return deferred.promise;

  };
});
