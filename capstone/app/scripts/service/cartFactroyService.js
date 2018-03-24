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
  var itemToRemove;

  /**
   *
   * @param {Name of storage to be created} key
   * @param {Value(s) to store} value
   */
  function save(key, value) {
    $window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   *
   * @param {Name of storage item} key
   */
  function get(key) {
    return $window.sessionStorage.getItem(key);
  }
  /**
   *
   * @param {Name of storage item} key
   */
  function removeItem(key) {
    return $window.sessionStorage.removeItem(key);
  }

  function clear() {
    $window.sessionStorage.clear();
  }

  /**
   *
   * @param {item name} nameOfItem
   * @param {item quantity} itemQuantity
   */
  function addItemToCart(item, itemQuantity = 1) {
    var result = false;

    // Create the addedItemsList both in the app
    // and in the sessionStorage
    if (get("addedItemsList")) {
      addedItemsList = JSON.parse(get("addedItemsList"));
      // check for duplicates and only update
      // the quantity value
      $window.alert("Check for duplicates");

      for (var i of addedItemsList) {
        if (i["name"] === item.name) {
          i["quantity"] += itemQuantity;
          result = true;
          break;
        }
      }

      if (!result) {
        $window.alert("Pusing into addedItemsList");
        // Add a quantity property
        item.quantity = itemQuantity;
        addedItemsList.push(item);
      }

      save("addedItemsList", addedItemsList);
      $window.alert("addedItemsList " + JSON.stringify(addedItemsList));
    } else {
      // Add a quantity property
      item.quantity = itemQuantity;
      addedItemsList.push(item);
      save("addedItemsList", addedItemsList);
      $window.alert("addedItemsList " + JSON.stringify(addedItemsList));
    }

    // Create sessionStorage for cart
    itemsToCart = addedItemsList;
    save("cartItemsFromStorage", itemsToCart);

    $window.alert("Cart items " + JSON.stringify(itemsToCart));
  }

  /**
   *
   * @param {object to remove from cart list} item
   */
  function removeCartItem(item) {
    $window.alert("Item " + JSON.stringify(item));
    if (get("cartItemsFromStorage")) {
      itemToRemove = JSON.parse(get("cartItemsFromStorage"));
      $window.alert(
        "cartItemsFromStorage array " + JSON.stringify(itemToRemove)
      );

      $window.alert("Before removal " + JSON.stringify(itemToRemove.length));
      angular.forEach(itemToRemove, function(i, index) {
        if (item.name === i.name) {
          itemToRemove.splice(index, 1);
        }
      });
      save("addedItemsList", itemToRemove);
      save("cartItemsFromStorage", itemToRemove);
      $window.alert("after removal " + JSON.stringify(itemToRemove.length));
    }
    // $window.alert('addedItemsList array ' + JSON.stringify(addedItemsList));
    // $window.alert('itemsToCart array ' + JSON.stringify(itemsToCart));
  }

  return {
    save: save,
    get: get,
    removeItem: removeItem,
    clear: clear,
    addItemToCart: addItemToCart,
    removeCartItem: removeCartItem
  };
}
