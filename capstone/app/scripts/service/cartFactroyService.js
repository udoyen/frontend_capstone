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
  var jq = jQuery.noConflict();

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
      for (var i of addedItemsList) {
        if (i["name"] === item.name) {
          i["quantity"] += itemQuantity;
          result = true;
          break;
        }
      }

      if (!result) {
        // Add a quantity property
        item.quantity = itemQuantity;
        addedItemsList.push(item);
      }

      save("addedItemsList", addedItemsList);
      $window.location.reload();
    } else {
      // Add a quantity property
      item.quantity = itemQuantity;
      addedItemsList.push(item);
      save("addedItemsList", addedItemsList);
      $window.location.reload();
    }

    // Create sessionStorage for cart
    itemsToCart = addedItemsList;
    save("cartItemsFromStorage", itemsToCart);
    $window.location.reload();

  }

  /**
   *
   * @param {object to remove from cart list} item
   */
  function removeCartItem(item) {
    if (get("cartItemsFromStorage")) {
      itemToRemove = JSON.parse(get("cartItemsFromStorage"));

      angular.forEach(itemToRemove, function(i, index) {
        if (item.name === i.name) {
          itemToRemove.splice(index, 1);
        }
      });
      if (itemToRemove.length > 0) {
        save("addedItemsList", itemToRemove);
        save("cartItemsFromStorage", itemToRemove);
      } else {
        removeItem('addedItemsList');
        removeItem('cartItemsFromStorage');
      }
      $window.location.reload();
    }

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
