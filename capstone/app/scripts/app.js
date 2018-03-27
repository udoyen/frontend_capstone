"use strict";

/**
 * @ngdoc overview
 * @name capstoneApp
 * @description
 * # capstoneApp
 *
 * Main module of the application.
 */
angular
  .module("capstoneApp", [
    "ngAnimate",
    "ngCookies",
    "ngResource",
    "ngRoute",
    "ngSanitize",
    "ngTouch",
    "ui.bootstrap"
  ])
  .config([
    "$routeProvider",
    "$locationProvider",
    function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider
        .when("/", {
          templateUrl: "views/main.html",
          controller: "MainCtrl",
          controllerAs: "main"
        })
        .when("/about", {
          templateUrl: "views/about.html",
          controller: "AboutCtrl",
          controllerAs: "about"
        })
        .when("/contact", {
          templateUrl: "views/contact.html",
          controller: "ContactCtrl",
          controllerAs: "contact"
        })
        .when("/shopping", {
          templateUrl: "views/shop.html",
          controller: "ShoppingCtrl",
          controllerAs: "shopping"
        })
        .when("/cart", {
          templateUrl: "views/cart.html",
          controller: "CartCtrl",
          controllerAs: "cart"
        })
        .when("/product/:category/:subcategory", {
          templateUrl: "views/product.html",
          controller: "ProductCtrl",
          controllerAs: "product"
        })
        .when("/product/:category", {
          templateUrl: "views/product.html",
          controller: "ProductCtrl",
          controllerAs: "product"
        })
        .when("/details/:itemName", {
          templateUrl: "views/details.html",
          controller: "DetailsCtrl",
          controllerAs: "details"
        })
        .otherwise({
          redirectTo: "/"
        });
    }
  ])
  .controller("NavigationCtrl", [
    "$scope",
    "$location",
    function($scope, $location) {
      $scope.isCurrentPath = function(path) {
        return $location.path() == path;
      };
    }
  ]);
