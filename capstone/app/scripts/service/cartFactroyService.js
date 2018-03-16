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
    var result = false;

    // Create the addedItemsList both in the app
    // and in the sessionStorage
    if (get('addedItemsList')) {
      addedItemsList = JSON.parse(get('addedItemsList'));
      // check for duplicates and only update
      // the quantity value
      $window.alert("Check for duplicates");

      for (var i of addedItemsList) {
        if (i['name'] === nameOfItem) {
          i['quantity'] += itemQuantity;
          result = true;
          break;
        }
      }

      if (!result) {
        $window.alert("Pusing into addedItemsList");
        addedItemsList.push({
          'name': nameOfItem,
          'quantity': itemQuantity
        });
      }

      save('addedItemsList', addedItemsList);
      $window.alert("addedItemsList " + JSON.stringify(addedItemsList));
    } else {
      addedItemsList.push({
        'name': nameOfItem,
        'quantity': itemQuantity
      });
      save('addedItemsList', addedItemsList);
      $window.alert("addedItemsList " + JSON.stringify(addedItemsList));

    }




  }

  return {
    save: save,
    get: get,
    removeItem: removeItem,
    clear: clear,
    addItemToCart: addItemToCart
  };
}
