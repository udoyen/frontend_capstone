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
      $scope.itemsArrayList = [];
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
                console.log($scope.singleCategory);
                $scope.category = products[value].category;
                console.log($scope.category);
                return $scope.singleCategory;
              }
            });

            $window.alert(JSON.stringify($scope.singleCategory));

            angular.forEach($scope.singleCategory, function (key, value) {
              angular.forEach(key.items, function (key, value) {
                $scope.itemsArrayList.push(key.name);

                // $window.alert(JSON.stringify(key.name));
              })

            })
            for (let index = 0; index <  $scope.itemsArrayList.length; index++) {
              console.log( $scope.itemsArrayList[index]);

            }
            $window.alert($scope.itemsArrayList.toString());
            // console.log()

        })
        .catch(function(e) {
          console.log("There was an error: " + e);
        });
      };

      // Use this function to load the api result into the page
      $scope.init = function() {
      console.log('Angular call function on product page load');
      $scope.subcategoriesProductList();
    };

    }
  ]);
