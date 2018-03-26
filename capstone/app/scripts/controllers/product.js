'use strict';

/**
 * @ngdoc function
 * @name capstoneApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the capstoneApp
 */
// TODO: Clean up this fle
angular.module('capstoneApp').controller('ProductCtrl', [
  '$routeParams',
  '$window',
  '$scope',
  'productService',
  '$route',
  'cartFactoryService',
  '$location',
  'helperService',
  function(
    $routeParams,
    $window,
    $scope,
    productService,
    $route,
    cartFactoryService,
    $location,
    helperService
  ) {
    $scope.subcategory = $routeParams.subcategory;
    $scope.category = $routeParams.category;
    $scope.currentPath = $location.path();
    $scope.singleCategory = {};
    $scope.itemsNameArrayList = [];
    $scope.itemsArrayList = [];
    $scope.dropdownChoiceIndex;
    $scope.dropdownChoiceIndexValue;
    $scope.subcatArrayListItems = [];
    $scope.subcatArrayListItemsCount;
    $scope.allProductsData = {};
    $scope.filteredItemsArrayList = [];
    $scope.sortFilterArray = ['none', 'price', 'alphabetical', 'rating'];
    $scope.sortFilterArrayItemValues = ['none', 'price', 'name', 'rating'];
    $scope.categoriesList = {
      'Household and Beauty': 0,
      'Pantry Items': 1,
      Perishable: 2,
      Produce: 3
    };

    $scope.addItemToCartFromProductspage = cartFactoryService.addItemToCart;
    $scope.allShopItems = [];
    $scope.subItems = [];
    $scope.subItemsCount;
    $scope.reduceProductCount;
    // To avoid conflicts with jquery
    var jq = jQuery.noConflict();
    $scope.countBoolean;
    $scope.iCount;
    $scope.pathCheck;
    $scope.subtractionValue;

    $scope.getDropdownIndex = function(dIndex) {
      $scope.dropdownChoiceIndex = $scope.sortFilterArray[dIndex];
      $scope.dropdownChoiceIndexValue =
        $scope.sortFilterArrayItemValues[dIndex];
    };

    $scope.subcategoriesProductList = function() {
      productService.getProducts().then(function(products) {
        $scope.allProductsData = products;
        console.log(products);
      });

      /**
       * Get data from productService
       */
      productService
        .getProducts()
        .then(function(products) {
          $scope.subcategory = $routeParams.subcategory;
          $scope.category = $routeParams.category;
          $window.alert($scope.currentPath);

          // Get the index of the categoryName
          angular.forEach($scope.categoriesList, function(value, key) {
            if (key === $scope.category) {
              $scope.singleCategory = products[value].subcategories;
              $scope.category = products[value].category;
            }
          });

          // Create ArrayList of subcategory items
          angular.forEach($scope.singleCategory, function(key, value) {
            angular.forEach(key.items, function(key, value) {
              $scope.itemsNameArrayList.push(key.name);
              $scope.itemsArrayList.push(key);
              $scope.subcatArrayListItems.push(key);
              // $window.alert('key.subcategory ' + JSON.stringify(key.subcategory).toUpperCase());
              // $window.alert('subcategory ' + JSON.stringify($scope.subcategory));
              if ( key.subcategory.toUpperCase() === $scope.subcategory.toUpperCase()) {
                $window.alert('Inside the if loop');
                $scope.subItems.push(key);
              }
            });
          });

          $window.alert('subItems ' + JSON.stringify($scope.subItems));

          // Set the subItemsCount
          $scope.subcatArrayListItemsCount = $scope.subcatArrayListItems.length;
          $window.alert('subcarArrayListItemsCount ' + $scope.subcatArrayListItemsCount);
          $scope.subItemsCount = $scope.subItems.length;
          $window.alert('subItemsCount ' + $scope.subItemsCount);
          $scope.pathCheck = function () {
            $window.alert('PathCheck function called');
            if ($scope.currentPath === '/product/' + $scope.category) {
              $scope.countBoolean = true;
            } else {
              $scope.countBoolean = false;
            }
          };

          $scope.pathCheck();
          $window.alert('countBoolean ' + $scope.countBoolean);


          angular.forEach(products, function(key, value) {
            angular.forEach(key.subcategories, function(key, value) {
              angular.forEach(key.items, function(key, value) {
                $scope.allShopItems.push(key);
              });
            });
          });

          $scope.reduceProductCount = function() {
            angular.element(document).ready(function() {
              $window.alert(jq('.card').length);
              $scope.iCount = jq('.card').length;
              if ($scope.isChecked) {
                $scope.subcatArrayListItemsCount = $scope.iCount;
                $scope.subItemsCount = $scope.iCount;

              } else {
                $scope.subcatArrayListItemsCount = $scope.iCount;
                $scope.subItemsCount = $scope.iCount;
              }

              // The new subItemsCount after removing
              // products not in stock via checkbox button
              // if ($scope.isChecked) {
              //   $window.alert('Inside isChecked true');
              //   if ($scope.countBoolean) {
              //     $window.alert('isChecked true countBoolean true');
              //     $scope.iCount = jq('.card').length;
              //     $window.alert('iCOunt ' + $scope.iCount);
              //     $scope.subcatArrayListItemsCount = $scope.iCount;
              //     $window.alert($scope.subcatArrayListItemsCount);
              //   }
              //   if (!$scope.countBoolean) {
              //     $window.alert('isChecked true countBoolean false');
              //     $scope.iCount = jq('.card').length;
              //     $window.alert('iCount ' + $scope.iCount);
              //     $scope.subItemsCount =  $scope.iCount;
              //     $window.alert($scope.subItemsCount);
              //   }
              // }

              // if (!$scope.isChecked) {
              //   $window.alert('Inside isChecked false');
              //   if ($scope.countBoolean) {
              //     $window.alert('isChecked false countBoolean true');
              //     $scope.iCount = jq('.card').length;
              //     $window.alert('iCount ' + $scope.iCount);
              //     $scope.subcatArrayListItemsCount = $scope.iCount;
              //     $window.alert($scope.subcatArrayListItemsCount);
              //   }
              //   if (!$scope.countBoolean) {
              //     $window.alert('isChecked false countBoolean false');
              //     $scope.iCount = jq('.card').length;
              //     $window.alert('iCount ' + $scope.iCount);
              //     $scope.subItemsCount =  $scope.iCount;
              //     $window.alert($scope.subItemsCount);
              //   }
              // }

            });
          };

          // The items in session storage
          cartFactoryService.save('shopItems', $scope.allShopItems);
        })
        .catch(function(e) {
          console.log('There was an error: ' + e);
        });
    };

    (function(jq) {
      // $window.alert($('.shopme').attr('id'));

      jq('#submenu').on('hide.bs.collapse', function() {
        jq('#shopmenu')
          .removeClass('fa-caret-down')
          .addClass('fa-caret-right');
      });
      jq('#submenu').on('show.bs.collapse', function() {
        jq('#shopmenu')
          .removeClass('fa-caret-right')
          .addClass('fa-caret-down');
      });
    })(jQuery);

    // Use this function to load the api result into the page
    $scope.init = function() {
      $scope.subcategoriesProductList();
      // helperService();
    };
  }
]);
