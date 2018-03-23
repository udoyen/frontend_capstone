'use strict';

/**
 * @ngdoc function
 * @name capstoneApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the capstoneApp
 */
angular.module('capstoneApp').controller('CartCtrl', [
  '$window',
  '$scope',
  'productService',
  'cartFactoryService',
  function($window, $scope, productService, cartFactoryService) {
    $scope.addedItems = [];
    $scope.cartIsEmptyText;
    $scope.subtotal;
    $scope.tax;
    $scope.shipping;
    $scope.cartState;
    $scope.removeCartItem;
    $scope.formValues = {};
    $scope.submit = submit;
    $scope.reset = reset;
    $scope.totalCost;

    reset();


    $scope.cartDetails = function() {
      if (
         cartFactoryService.get('cartItemsFromStorage') ===
          'undefined' ||
        cartFactoryService.get('cartItemsFromStorage') === null
      ) {
        $scope.cartState = false;
        // $window.alert('No items were found');
        $scope.cartIsEmptyText = 'Cart has no items in it!';
        // $window.alert($scope.cartIsEmptyText);

      } else {
        $scope.cartState = true;
        // $window.alert('Inside the cartDetails function');
        $scope.addedItems = JSON.parse(cartFactoryService.get('cartItemsFromStorage'));
        // $window.alert("Cart items " + JSON.stringify($scope.addedItems));
        //Calculate subtotal
        // $window.alert("subtotal variable")
        $scope.calSubtotal($scope.addedItems);
        //Calculate the tax
        $scope.taxCal(5, $scope.subtotal);
        //Calculate shipping
        $scope.shippingCal(2, $scope.subtotal);
      }
    };

    function submit (values) {
      $scope.formValues.totalCost = JSON.stringify($scope.subtotal + $scope.shipping + $scope.tax);
      alert('Submitted\n' + JSON.stringify($scope.formValues));
    };


    function reset() {
      $scope.formValues = {};
    }


    /**
     *
     * @param {function to calculate the subtotal} itemObject
     */
    $scope.calSubtotal = function (itemObject) {
      var sub = 0;
      for ( var i of itemObject) {
        var cal = i['quantity'] * i['price'];
        sub += cal
      }
      $scope.subtotal = sub;

      return $scope.subtotal;
    };

    /**
     *
     * @param {cart item to remove} cartItemObj
     */
    $scope.removeCartItem = function (cartItemObj) {
      cartFactoryService.removeCartItem(cartItemObj);
      // Call the cartDetails function
      // to refresh the page
      $scope.cartDetails();
    }

    /**
     *
     * @param {tax percentage} percentageTax
     * @param {Amount to tax} AmountToTax
     */
    $scope.taxCal = function (percentageTax, AmountToTax) {
      $scope.tax = (( percentageTax / 100 ) * AmountToTax );

      return $scope.tax;
    }

    $scope.shippingCal = function (rate, totalItemCost) {
      $scope.shipping = (( rate / 100 ) * totalItemCost );
      return $scope.shipping;
    }

    /**
     * Page initializer function
     */
    $scope.init = function() {
      $window.alert('Call from cart details Controller');
      $scope.cartDetails();
    };
  }
]);
