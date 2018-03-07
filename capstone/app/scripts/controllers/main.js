"use strict";
// TODO: Tidy this page
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
  function($window, $scope) {
    $scope.goToShop = function() {
      $window.location.href='http://localhost/shopping_page';
    };
  }
]);
