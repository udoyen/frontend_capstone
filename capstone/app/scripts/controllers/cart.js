"use strict";

/**
 * @ngdoc function
 * @name capstoneApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the capstoneApp
 */
angular.module("capstoneApp").controller("CartCtrl", [
  "$window",
  "$scope",
  "productService",
  "cartFactoryService",
  function($window, $scope, productService, cartFactoryService) {
    $scope.addedItems = [];
    $scope.cartIsEmptyText;

    $scope.cartDetails = function() {
      if (
         cartFactoryService.get("cartItemsFromStorage") ===
          'undefined' ||
        cartFactoryService.get("cartItemsFromStorage") === null
      ) {
        $window.alert("No items were found");
        $scope.cartIsEmptyText = "Cart has no items in it!";
        $window.alert($scope.cartIsEmptyText);

      } else {
        $window.alert("Inside the cartDetails function");
        $scope.addedItems = cartFactoryService.get("cartItemsFromStorage");
      }
    };

    $scope.init = function() {
      $window.alert("Call from cart details Controller");
      $scope.cartDetails();
    };
  }
]);
