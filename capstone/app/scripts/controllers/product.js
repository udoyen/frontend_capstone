'use strict';

/**
 * @ngdoc function
 * @name capstoneApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the capstoneApp
 */
angular.module('capstoneApp')
  .controller('ProductCtrl', [
    '$routeParams',
    '$window',
    '$scope',
    'productService',
    function ($routeParams, $window, $scope, productService) {
      var subcat = $routeParams.subcategory;
      $scope.singleCategory = {};
      $scope.categoriesList = {
        'Household and Beauty': 0,
        'Pantry Items': 1,
        'Perishable': 2,
        'Produce': 3
      };

      $scope.subcategoriesProductList = function () {
        productService
        .getProducts()
        .then(function(products) {

            // Get the index of the categoryName
            angular.forEach($scope.categoriesList, function(value, key) {
              if (key === subcat) {
                $scope.singleCategory = products[value].subcategories;
                return $scope.singleCategory;
              }
            });

            $window.alert(JSON.stringify($scope.singleCategory));

        })
        .catch(function(e) {
          console.log("There was an error: " + e);
        });
      };

      // Use this function to load the api result into the page
      $scope.init = function() {
      console.log('Angular call function on page load');
      $scope.subcategoriesProductList();
    };

    }
  ]);
