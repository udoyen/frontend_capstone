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
    return $window.sessionStorage.getItem(key);
  }

  function removeItem(key) {
    return $window.sessionStorage.removeItem(key);
  }

  function clear() {
    $window.sessionStorage.clear();
  }

  function addItemToCart(nameOfItem, itemQuantity = 1) {

    // Persist the items list between page refresh
    if (!get('addedItemsList')) {
      $window.alert("Creating new items list in session storage");
      save("addedItemsList", addedItemsList);
    } else {
      $window.alert("Getting the items list from sessionStorage");
      addedItemsList = get('addedItemsList');
    }

    $window.alert(get('addedItemsList'));

    $window.alert("addedItemsList " + JSON.stringify(addedItemsList));

    $window.alert("Inside addItemToCart function");

    // Check to see if the addedItemsList Array is empty
    if (addedItemsList.length !== 0) {
      $window.alert("Inside if loop");
      angular.forEach(addedItemsList, function(i) {
        // Check if item exists
        if (i.name === nameOfItem) {
          $window.alert("Checking if ite already exists");
          // If it does increase the quantity
          i.quantity += quantity;
        } else {
          $window.alert("Add new items");
          // Add new items to temp items list
          this.addedItemsList.push({
            'name': nameOfItem,
            'quantity': itemQuantity
          });
        }
      });
    } else {
      $window.alert("Outside else loop, add new item");
      // Add items to temp items list
      addedItemsList.push({
        'name': nameOfItem,
        'quantity': itemQuantity
      });
    }
    $window.alert("addedItemsList" + JSON.stringify(addedItemsList));

    // Get the items collection from sessionStorage
    var products = JSON.parse(get("shopItems"));
    $window.alert("shopItems " + JSON.stringify(products));
    //
    angular.forEach(products, function(p) {
      angular.forEach(addedItemsList, function(q) {
        if (p.name === q.name) {
          p.quantity = q.quantity;
          itemsFromStorage.push(p);
        }
      });
    });

    $window.alert("itemsFromStorage " + JSON.stringify(itemsFromStorage));
    // Create sessionStorage
    save("cartItemsFromStorage", itemsFromStorage);
  }

  return {
    save: save,
    get: get,
    removeItem: removeItem,
    clear: clear,
    addItemToCart: addItemToCart
  };
}
