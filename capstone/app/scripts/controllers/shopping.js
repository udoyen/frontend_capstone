'use strict';
// TODO: Clean up this file
/**
 * @ngdoc function
 * @name capstoneApp.controller:ShoppingCtrl
 * @description
 * # ShoppingCtrl
 * Controller of the capstoneApp
 */
angular.module('capstoneApp').controller('ShoppingCtrl', [
  '$window',
  '$scope',
  'productService',
  function($window, $scope, productService) {
    $scope.data = {};
    $scope.cat = {};
    $scope.allProductsData = {};
    $scope.houseHoldAndBeautyData = {};
    $scope.produceData = {};
    $scope.perishablesData = {};
    $scope.pantryItemsData = {};
    $scope.mProducts = {};
    $scope.allSubcategories = {};

    $scope.categories = {
      'Household and Beauty': 0,
      'Pantry Items': 1,
      'Perishable': 2,
      'Produce': 3
    };
    $scope.myProducts = function() {
      // $window.alert(JSON.stringify(productService.getProducts().data));
      productService
        .getProducts()
        .then(
          function(products) {
            $scope.mProducts = products;
            $scope.allProductsData = products.data;
            $scope.houseHoldAndBeautyData = products.data[0].subcategories;
            $scope.produceData = products.data[3].subcategories;
            $scope.perishablesData = products.data[2].subcategories;
            $scope.pantryItemsData = products.data[1].subcategories;
            $scope.allSubcategories = products.data.subcategories;

            $window.alert("Subcategories: " + $scope.allSubcategories);

            // alert(JSON.stringify(products.data));
            console.log(products.data);
            // $window.alert($scope.allProductsData);
            $scope.objectData = products.data;
          },
          function(response) {
            console.log('There was an arror: ' + response.data);
          }
        ).then(
          function (response) {
            $scope.getCategories = function (name) {
              var d = response.data[$scope.categories[name]].subcategories;
              return d;
            };
          }

        );
    };

    // Use this function to load the api result into the page
    $scope.init =  function () {
      console.log('Angular call function on page load');
      $scope.myProducts();
    };


  }


]);
