"use strict";
/**
 * @ngdoc function
 * @name capstoneApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the capstoneApp
 */
angular.module("capstoneApp").controller("MainCtrl", [
  "$window",
  "$scope",
  "productService",
  "sessionFactory",
  function ($window, $scope, productService, sessionFactory) {
    $scope.allProductsData = {};
    $scope.slide1 = [];
    $scope.slide2 = [];
    $scope.slide3 = [];
    $scope.itemArrayList = [];
    // To avoid conflicts with jquery
    var jq = jQuery.noConflict();
    $scope.changeCarouselSpeed;
    $scope.logoImage = './images/logo2.png' ;


    $scope.changeCarouselSpeed = function () {
      if ($scope.isChecked) {

        jq('#carouselControls').attr('data-interval', '3000');
      } else {

        jq('#carouselControls').removeAttr('data-interval');

      }

    }


    $scope.goToShop = function () {
      $window.location.href = "http://localhost/shopping_page";
    };

    $scope.myproducts = function () {
      productService.getProducts().then(function (products) {
        $scope.allProductsData = products;

        if ($scope.allProductsData) {
          // Create item list
          angular.forEach($scope.allProductsData, function (obj) {
            angular.forEach(obj.subcategories, function (subcat) {
              angular.forEach(subcat.items, function (item) {
                $scope.itemArrayList.push(item);
              });
            });
          });
          // Store in sessionStorage
          sessionFactory.save("itemsArrayList", $scope.itemArrayList);

        } else {
          $window.alert("No data!");
        }

        $scope.imageSelector();
      });
    };

    $scope.shuffleArray = function (array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    $scope.imageSelector = function () {
      if (sessionFactory.get("itemsArrayList")) {
        $scope.myImages = JSON.parse(sessionFactory.get("itemsArrayList"));
        // Shuffle the productsImageArrayList
        $scope.shuffleArray($scope.myImages);

        // Create the slide images
        for (let index = 0; index < 4; index++) {
          $scope.slide1.push($scope.myImages[index]);
        }

        for (let index = 4; index < 8; index++) {
          $scope.slide2.push($scope.myImages[index]);
        }

        for (let index = 8; index < 12; index++) {
          $scope.slide3.push($scope.myImages[index]);
        }
      } else {
        // Shuffle the productsImageArrayList
        $scope.shuffleArray($scope.itemArrayList);


        // Create the slide images
        for (let index = 0; index < 4; index++) {
          $scope.slide1.push($scope.itemArrayList[index]);
        }

        for (let index = 4; index < 8; index++) {
          $scope.slide2.push($scope.itemArrayList[index]);
        }

        for (let index = 8; index < 12; index++) {
          $scope.slide3.push($scope.itemArrayList[index]);
        }
      }


    };

    /**
     * Page initializer function
     */
    $scope.init = function () {
      $scope.myproducts();
    };


  }
]);
