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
    '$route',
    'cartFactoryService',
    function ($routeParams, $window, $scope, productService, $route, cartFactoryService) {
      console.log('Subcategory' + $route.current.params.subcategory);
      console.log('Category' + $routeParams.category);
      $scope.subcategory = $routeParams.subcategory;
      $scope.category = $routeParams.category;
      $scope.singleCategory = {};
      $scope.itemsNameArrayList = [];
      $scope.itemsArrayList = [];
      $scope.dropdownChoiceIndex;
      $scope.subcatArrayListItems = [];
      $scope.allProductsData = {};
      $scope.filteredItemsArrayList = [];
      $scope.sortFilterArray = [
        'none', 'price', 'alphabetical', 'rating'
      ];
      $scope.categoriesList = {
        'Household and Beauty': 0,
        'Pantry Items': 1,
        'Perishable': 2,
        'Produce': 3
      };

      $scope.addItemToCartFromProductspage = cartFactoryService;
      $scope.allShopItems = [];

      $scope.getDropdownIndex = function (dIndex) {
        $scope.dropdownChoiceIndex = $scope.sortFilterArray[dIndex];
      }



      $scope.subcategoriesProductList = function () {
        productService
        .getProducts()
        .then(function (products) {
          $scope.allProductsData = products;
          console.log(products);
        });

        productService
        .getProducts()
        .then(function(products) {
              $scope.subcategory = $routeParams.subcategory;
              $scope.category = $routeParams.category;
              console.log(typeof $scope.subcategory);
              console.log(typeof $scope.category);

            // Get the index of the categoryName
            angular.forEach($scope.categoriesList, function(value, key) {
              if (key === $scope.category) {
                $scope.singleCategory = products[value].subcategories;
                console.log($scope.singleCategory);
                $scope.category = products[value].category;
                console.log($scope.category);

              }
            });

            console.log(JSON.stringify($scope.singleCategory));

            // Create ArrayList of subcategory items
            angular.forEach($scope.singleCategory, function (key, value) {
              angular.forEach(key.items, function (key, value) {
                $scope.itemsNameArrayList.push(key.name);
                $scope.itemsArrayList.push(key);
                $scope.subcatArrayListItems.push(key);

              })

            })
            // Create filtered items
            // angular.forEach($scope.subcatArrayListItems, function (key, value) {
            //   if (angular.equals(key.subcategory, $scope.subcategory)) {
            //     console.log(JSON.stringify(key));
            //     $scope.filteredItemsArrayList.push(key);
            //   }

            // })


              angular.forEach(products, function (key, value) {
                angular.forEach(key.subcategories, function (key, value) {
                  angular.forEach(key.items, function (key, value) {
                    $scope.allShopItems.push(key);
                  })
                })
              })

              // The items in session storage
              cartFactoryService.save('shopItems', $scope.allShopItems);

              console.log($scope.allShopItems);


            // for (let index = 0; index <  $scope.itemsNameArrayList.length; index++) {
            //   console.log( $scope.itemsNameArrayList[index]);

            // }
            // console.log($scope.itemsNameArrayList.toString());
            console.log('List items' + JSON.stringify($scope.subcatArrayListItems));
            console.log('Items Array List' + JSON.stringify($scope.itemsArrayList));

        })
        .catch(function(e) {
          console.log('There was an error: ' + e);
        });
      };

      // Use this function to load the api result into the page
      $scope.init = function() {
      console.log('Angular call function on product page load');
      $scope.subcategoriesProductList();
      // getAllShopItems();
    };

  }
  ]);
