/****************************************************
 Session Factory to store user information for the
 duration the user session
 ****************************************************/

'use strict';

angular
  .module('capstoneApp')
  .service('sessionFactory', ['$window', sessionFactory]);

  function sessionFactory($window) {

    function save(key, value) {
      $window.sessionStorage.setItem(key, value);
    }

    function get(key) {
      return $window.sessionStorage.getItem(key);
    }

    function clear() {
      $window.sessionStorage.clear();
    }

    return {
      save: save,
      get: get,
      clear: clear,
    }
  }
