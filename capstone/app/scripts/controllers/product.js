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
      var category = $routeParams.category;
      $scope.singleCategory = {};
      $scope.itemsNameArrayList = [];
      $scope.itemsArrayList = [];
      $scope.dropdownChoiceIndex;
      $scope.subcatArrayListItems = [];
      $scope.filteredItemsArrayList = [];
      $scope.sortFilterArray = [
        'none', 'price', 'alphabetical', 'rating'
      ]
      $scope.categoriesList = {
        'Household and Beauty': 0,
        'Pantry Items': 1,
        'Perishable': 2,
        'Produce': 3
      };

      $scope.getDropdownIndex = function (dIndex) {
        $scope.dropdownChoiceIndex = $scope.sortFilterArray[dIndex];
      }



      $scope.subcategoriesProductList = function () {
        productService
        .getProducts()
        .then(function(products) {

            // Get the index of the categoryName
            angular.forEach($scope.categoriesList, function(value, key) {
              if (key === category) {
                $scope.singleCategory = products[value].subcategories;
                console.log($scope.singleCategory);
                $scope.category = products[value].category;
                console.log($scope.category);
                // return $scope.singleCategory;
              }
            });

            $window.alert(JSON.stringify($scope.singleCategory));

            angular.forEach($scope.singleCategory, function (key, value) {
              angular.forEach(key.items, function (key, value) {
                $scope.itemsNameArrayList.push(key.name);
                $scope.subcatArrayListItems.push(key);

              })

            })
            angular.forEach($scope.subcatArrayListItems, function (key, value) {
              angular.forEach(key, function (value) {
                if (value === subcat) {
                  $scope.filteredItemsArrayList.push(key);
                }
              })
              // if (key.subcategory === subcat) {
              //   $scope.filteredItemsArrayList.push(key);
              // }
              // $window.alert("Subcate: " + JSON.stringify(key));
            })

            for (let index = 0; index <  $scope.itemsNameArrayList.length; index++) {
              console.log( $scope.itemsNameArrayList[index]);

            }
            $window.alert($scope.itemsNameArrayList.toString());
            $window.alert("List items" + JSON.stringify($scope.subcatArrayListItems));

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
