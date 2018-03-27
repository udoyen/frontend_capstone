'use strict';
$.noConflict();

angular
  .module('capstoneApp')
  .service('helperService', ['$window', helperService]);

function helperService($window) {
  (function($) {
    // $window.alert($('.shopme').attr('id'));

    $('#submenu').on('hide.bs.collapse', function() {
      $('#shopmenu')
        .removeClass('fa-caret-down')
        .addClass('fa-caret-right');
    });
    $('#submenu').on('show.bs.collapse', function() {
      $('#shopmenu')
        .removeClass('fa-caret-right')
        .addClass('fa-caret-down');
    });

    // $('input#qty').on('input', function (){
    //   alert("Value changed on cart page");
    // })

  })(jQuery);
}
