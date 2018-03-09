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
    $scope.subcatArrayList = {};
    $scope.singleCategory = {};

    $scope.categoriesList = {
      'Household and Beauty': 0,
      'Pantry Items': 1,
      'Perishable': 2,
      'Produce': 3
    };
    $scope.myProducts = function() {
      // $window.alert(JSON.stringify(productService.getProducts().data));
      productService
        .getProducts()
        .then(function(products) {
        $scope.allProductsData = products;
        console.log(products);

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

          angular.forEach($scope.allProductsData, function (key, value) {
            var m = key.category;
            angular.forEach(key.subcategories, function (key, value) {
              $scope.subcatArrayList[key.name] =  m;

              // $window.alert(JSON.stringify(key.name));
            })

          })
            console.log(JSON.stringify($scope.subcatArrayList));

          $window.alert(JSON.stringify($scope.subcatArrayList));
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
