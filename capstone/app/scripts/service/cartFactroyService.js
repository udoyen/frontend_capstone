/*******************************
 Cart Factory Service
 *******************************/
"use strict";

angular
  .module("capstoneApp")
  .service("cartFactoryService", ["$window", cartFactoryService]);
function cartFactoryService($window) {
  var addedItemsList = [];
  var itemsFromStorage = [];

  function save(key, value) {
    $window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  function get(key) {
    return JSON.parse($window.sessionStorage.getItem(key));
  }

  function removeItem(key) {
    return $window.sessionStorage.removeItem(key);
  }

  function clear() {
    $window.sessionStorage.clear();
  }

  function addItemToCart(nameOfItem, quantity) {
    var quan = null;

    // Check to see if the addedItemsList Array is empty
    if (addedItemsList !== null) {
      angular.forEach(addedItemsList, function(i) {
        // Check if item exists
        if (i.name === nameOfItem) {
          // If it does increase the quantity
          i.quantity += quantity;
        } else {
          // Add new items to temp items list
          this.addedItemsList.push({
            name: nameOfItem,
            quantity: quantity
          });
        }
      });
    } else {
      // Add items to temp items list
      this.addedItemsList.push({
        name: nameOfItem,
        quantity: quantity
      });
    }

    // Get the items collection from sessionStorage
    var products = $window.sessionStorage.get("shopItems");
    //
    angular.forEach(products, function(p) {
      angular.forEach(addedItemsList, function(q) {
        if (p.name === q.name) {
          p.quantity = q.quantity;
          this.itemsFromStorage.push(p);
        }
      });
    });

    // Create sessionStorage
    $window.sessionStorage.save("cartItemsFromStorage", this.itemsFromStorage);
  }

  return {
    save: save,
    get: get,
    removeItem: removeItem,
    clear: clear,
    addItemToCart: addItemToCart
  };
}
