"use strict";

/**
 * @ngdoc function
 * @name capstoneApp.controller:ShoppingCtrl
 * @description
 * # ShoppingCtrl
 * Controller of the capstoneApp
 */
angular.module("capstoneApp").controller("ShoppingCtrl", [
  "$window",
  "$scope",
  "productService",
  function($window, $scope, productService) {
    $scope.data = {};
    $scope.cat = {};
    $scope.houseHoldAndBeautyData = {};
    $scope.produceData = {};
    $scope.perishablesData = {};
    $scope.pantryItemsData = {};
    $scope.mProducts = {};

    $scope.categories = {
      'Household and Beauty': 0,
      'Pantry Items': 1,
      'Perishable': 2,
      'Produce': 3
    };
    $scope.myProducts = function() {
      // alert(JSON.stringify(productService.getProducts().data));
      productService
        .getProducts()
        .then(
          function(products) {
            $scope.mProducts = products;
            $scope.allProductsData = products.data;
            $scope.houseHoldAndBeautyData = products.data[0]["subcategories"];
            $scope.produceData = products.data[3]["subcategories"];
            $scope.perishablesData = products.data[2]["subcategories"];
            $scope.pantryItemsData = products.data[1]["sub0categories"];

            alert(JSON.stringify(products.data));
            // console.log(products.data);
            $scope.objectData = JSON.parse(products.data);
          },
          function(response) {
            alert("There was an arror: " + response);
          }
        ).then(
          function (response) {
            $scope.getCategories = function (name) {
              var d = response.data[categories[name]]["subcategories"];
              return d;
            }
          }

        );
    };

    // Use this function to load the api result into the page
    $scope.init =  function () {
      alert("Angular call function on page load");
      $scope.myProducts();
    }


  }


]);
