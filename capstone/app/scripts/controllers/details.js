'use strict';

/**
 * @ngdoc funtion
 * @name capstoneApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the capstoneApp
 */
// TODO: Tidy this file
angular.module('capstoneApp').controller('DetailsCtrl', [
  '$routeParams',
  '$window',
  '$scope',
  'productService',
  'cartFactoryService',
  function($routeParams, $window, $scope, productService, cartFactoryService) {
    $scope.getItemsInSessionStorage = [];
    $scope.getProductsFromProductService = [];
    $scope.itemName = $routeParams.itemName;
    $scope.productDetails = [];
    $scope.addItemToCartFromDetailsPage = cartFactoryService.addItemToCart;

    $window.alert($routeParams.itemName);

    $scope.itemDetails = function() {
      if (
        cartFactoryService.get('shopItems')
      ) {
        $window.alert("Getting data from seessionStorage");
        $scope.getItemsInSessionStorage = JSON.parse(cartFactoryService.get(
          'shopItems')
        );
        angular.forEach($scope.getItemsInSessionStorage, function(value) {
          if (value.name == $scope.itemName) {
            $scope.productDetails.push(value);
          }
        });
        $window.alert(JSON.stringify($scope.getItemsInSessionStorage));
        $window.alert(JSON.stringify($scope.productDetails));
      } else {
        productService
          .getProducts()
          .then(function(products) {
            angular.forEach(products, function(key, value) {
              angular.forEach(key.subcategories, function(key, value) {
                angular.forEach(key.items, function(key, value) {
                  $scope.getProductsFromProductService.push(key);
                });
              });
            });

            angular.forEach($scope.getProductsFromProductService, function(
              value
            ) {
              if (value.name == $scope.itemName) {
                $scope.productDetails.push(value);
              }
            });
            $window.alert(JSON.stringify($scope.getProductsFromProductService));
            $window.alert(JSON.stringify($scope.productDetails));

          })
          .catch(function(e) {
            console.log('There was an error: ' + e);
          });
      }
    };

    $scope.init = function () {
      $window.alert('Call from details Controller');
      $scope.itemDetails();
    };
  }
]);
