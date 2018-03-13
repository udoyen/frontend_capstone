/*******************************
 Cart Factory Service
 *******************************/
"use strict";

angular
  .module("capstoneApp")
  .service("cartFactoryService", ["$window", cartFactoryService]);
function cartFactoryService($window) {
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
    clear: clear
  };
}
