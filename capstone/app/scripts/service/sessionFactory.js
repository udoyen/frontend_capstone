/****************************************************
 Session Factory to store user information for the
 duration the user session
 ****************************************************/

"use strict";

angular
  .module("capstoneApp")
  .service("sessionFactory", ["$window", sessionFactory]);

function sessionFactory($window) {
  function save(key, value) {
    $window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  function get(key) {
    return $window.sessionStorage.getItem(key);
  }

  function clear() {
    $window.sessionStorage.clear();
  }

  /**
   *
   * @param {Name of storage item} key
   */
  function removeItem(key) {
    return $window.sessionStorage.removeItem(key);
  }

  return {
    save: save,
    get: get,
    clear: clear,
    removeItem: removeItem
  };
}
