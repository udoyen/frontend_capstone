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
    $scope.allProductsData = {};
    $scope.houseHoldAndBeautyData = {};
    $scope.produceData = {};
    $scope.perishablesData = {};
    $scope.pantryItemsData = {};
    $scope.allSubcategories = {};
    $scope.subcatArrayList = [];
    $scope.singleCategory = {};

    $scope.categoriesList = {
      'Household and Beauty': 0,
      'Pantry Items': 1,
      Perishable: 2,
      Produce: 3
    };
    $scope.myProducts = function() {
      // $window.alert(JSON.stringify(productService.getProducts().data));
      productService
        .getProducts()
        .then(function(products) {
        $scope.allProductsData = products;
        $scope.houseHoldAndBeautyData = products[0].subcategories;
        $scope.produceData = products[3].subcategories;
        $scope.perishablesData = products[2].subcategories;
        $scope.pantryItemsData = products[1].subcategories;
        // $scope.allSubcategories = products.subcategories;

        console.log(products);

        // alert(JSON.stringify(products.data));
        // console.log(allSubcategories);
        // $window.alert($scope.allProductsData);
        $scope.objectData = products;
      });

      productService
        .getProducts()
        .then(function(products) {
          $scope.goToCategoriesPage = function(categoryName) {
            // Get the index of the categoryName
            angular.forEach($scope.categoriesList, function(value, key) {
              if (key === categoryName) {
                $scope.singleCategory = products[value].subcategories;
                return $scope.singleCategory;
              }
            });

            $window.alert(JSON.stringify($scope.singleCategory));
          };
        })
        .catch(function(e) {
          console.log('There was an error: ' + e);
        });
    };

    // Use this function to load the api result into the page
    $scope.init = function() {
      console.log('Angular call function on page load');
      $scope.myProducts();
    };
  }
]);
