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
    $scope.subcatArrayNameList = {};
    $scope.subcatArrayListItems = [];
    $scope.singleCategory = {};

    $scope.categoriesList = {
      'Household and Beauty': 0,
      'Pantry Items': 1,
      'Perishable': 2,
      'Produce': 3
    };
    $scope.myProducts = function() {
      // console.log(JSON.stringify(productService.getProducts().data));
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



            console.log("Sinlge Category" + JSON.stringify($scope.singleCategory));
          };

          $scope.getMe = function () {
            $scope.goToCategoriesPage('Pantry Items')
            angular.forEach($scope.singleCategory, function (value) {
              angular.forEach(value.items, function (key, value) {
                console.log(JSON.stringify(key));
              })

            })
          };

          angular.forEach($scope.allProductsData, function (key, value) {
            var m = key.category;
            angular.forEach(key.subcategories, function (key, value) {
              $scope.subcatArrayNameList[key.name] =  m;

              // console.log(JSON.stringify(key.name));
            })

          })


          console.log(JSON.stringify($scope.subcatArrayNameList));

          console.log("Sublist" + JSON.stringify($scope.subcatArrayNameList));


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
