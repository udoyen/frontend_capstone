"use strict";

/**
 * @ngdoc funtion
 * @name capstoneApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the capstoneApp
 */
angular.module("capstoneApp").controller("DetailsCtrl", [
  "$routeParams",
  "$window",
  "$scope",
  "productService",
  "cartFactoryService",
  function($routeParams, $window, $scope, productService, cartFactoryService) {
    $scope.getItemsInSessionStorage = [];
    $scope.getProductsFromProductService = [];
    $scope.itemName = $routeParams.itemName;
    $scope.productDetails = [];
    $scope.addItemToCartFromDetailsPage = cartFactoryService.addItemToCart;
    $scope.goBack;

    $scope.itemDetails = function() {
      if (cartFactoryService.get("shopItems")) {
        $scope.getItemsInSessionStorage = JSON.parse(
          cartFactoryService.get("shopItems")
        );
        angular.forEach($scope.getItemsInSessionStorage, function(value) {
          if (value.name == $scope.itemName) {
            $scope.productDetails.push(value);
          }
        });
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
          })
          .catch(function(e) {
            console.log("There was an error: " + e);
          });
      }
    };

    $scope.goBack = function () {
      $window.history.back();
    };

    $scope.init = function() {
      $scope.itemDetails();
    };
  }
]);
