/*****************************
 * Menu arrow change javascript
 *
 *****************************/

angular.element(document).ready(function() {
  $("#submenu").on("hide.bs.collapse", function() {
    // alert('hidden');
    $("p > a + i")
      .removeClass("fa-caret-down")
      .addClass("fa-caret-right");
  });
  $("#submenu").on("show.bs.collapse", function() {
    // alert('shown');
    $("p > a + i")
      .removeClass("fa-caret-right")
      .addClass("fa-caret-down");
  });
  $($(".shopme").attr("id")).on("hide.bs.collapse", function() {
    $("p > a + i")
      .removeClass("fa-caret-down")
      .addClass("fa-caret-right");
  });
  $($(".shopme").attr("id")).on("show.bs.collapse", function() {
    $("p > a + i")
      .removeClass("fa-caret-right")
      .addClass("fa-caret-down");
  });
  $("#toggle").change(function() {
    alert($(this).prop("checked"));
  });
});
