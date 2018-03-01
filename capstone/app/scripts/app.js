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
    "ngTouch"
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
        .when("/shopping_page", {
          templateUrl: "views/shop.html",
          controller: "ShoppingCtrl",
          controllerAs: "shopping"
        })
        .when("/cart", {
          templateUrl: "views/cart.html",
          controller: "CartCtrl",
          controllerAs: "cart"
        })
        .when("/product", {
          templateUrl: "views/product.html",
          controller: "ProductCtrl",
          controllerAs: "product"
        })
        .otherwise({
          redirectTo: "/"
        });
    }
  ]);
