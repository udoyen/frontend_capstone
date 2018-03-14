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

    $scope.cartDetails = function() {
      if (
        $window.sessionStorage.get("cartItemsFromStorage") !== "undefined" ||
        $window.sessionStorage.get("cartItemsFromStorage") !== "null"
      ) {
        $scope.addedItems = $window.sessionStorage.get("cartItemsFromStorage");
      } else {
        $scope.cartIsEmptyText = "Cart has no items in it!";
      }
    };

    $scope.init = function() {
      $window.alert("Call from cart details Controller");
      $scope.cartDetails();
    };
  }
]);
