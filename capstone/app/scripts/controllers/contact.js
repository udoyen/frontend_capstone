'use strict';

/**
 * @ngdoc function
 * @name capstoneApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the capstoneApp
 */
angular.module('capstoneApp')
  .controller('ContactCtrl', [
    '$window',
    '$scope',
    function ($window, $scope) {
      $scope.dropdownChoiceValue
      $scope.submit = submit;
      $scope.reset = reset;
      $scope.getDropdownValue;

      /**
     *
     * @param {form values} values
     */
    function submit (values) {
      alert(JSON.stringify(values));
    };


    /**
     * Reset the form fields
     */
    function reset() {
      $scope.formValues = {};
    }


      $scope.getDropdownValue = function (value) {
        $scope.dropdownChoiceValue = value;
    };
    }
  ]);

