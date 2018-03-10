/****************************************************
 Session Service to store user information for the
 duration the user session
 ****************************************************/

'use strict';

angular
  .module('capstoneApp')
  .service('sessionService', ['$window', sessionService]);

  function sessionService($window) {
    this.save = save;
    this.get = get;
    this.clear = clear;

    function save(key, value) {
      $window.sessionStorage.setItem(key, value);
    }

    function get(key) {
      return $window.sessionStorage.getItem(key);
    }

    function clear() {
      $window.sessionStorage.clear();
    }
  }
