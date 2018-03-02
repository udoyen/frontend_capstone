'use strict';

/**
 * @ngdoc function
 * @name capstoneApp.controller:ShoppingCtrl
 * @description
 * # ShoppingCtrl
 * Controller of the capstoneApp
 */
angular.module('capstoneApp')
  .controller('ShoppingCtrl', ['$scope', 'productService', function ($scope, productService) {
    $scope.data = {};
    $scope.myProducts = function () {
      // alert(JSON.stringify(productService.getProducts().data));
      productService.getProducts()
      .then(function (data) {
        $scope.data = data;
        alert(JSON.stringify($scope.data));

      }, function (response) {
          alert("There was an arror: " + response);
      })
    }

  }]);
