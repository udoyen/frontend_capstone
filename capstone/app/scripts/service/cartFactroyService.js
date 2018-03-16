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
  var itemsToCart = [];

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

    // Get the list of products items
    if (get('shopItems')) {
      itemsFromStorage = JSON.parse(get('shopItems'));
      angular.forEach(addedItemsList, function (i) {
        angular.forEach(itemsFromStorage, function (d) {
          if (i.name === d.name) {
            d.quantity = i.quantity;
            itemsToCart.push(d);
          }
        })
      })
    } else {
      $window.alert("Cart is empty!");
    }

    // Create sessionStorage for cart
    save('cartItemsFromStorage', itemsToCart);

    $window.alert("Cart items " + JSON.stringify(itemsToCart));




  }

  return {
    save: save,
    get: get,
    removeItem: removeItem,
    clear: clear,
    addItemToCart: addItemToCart
  };
}
