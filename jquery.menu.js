(function($) {

  $.fn.menu = function(options) {


    var fillUL = function(jsonCode, dest) {

      var i = 0;
      if (jsonCode instanceof Array) {
        for (i = 0; i < jsonCode.length; i += 1) {
          var $LI = $("<li></li>");
          $LI.find("*").css({
            "display": "none"
          });

          if (jsonCode[i].children != undefined) {
            $LI.addClass("hasChildren");
          } else {
            $LI.addClass("noChildren");
          }

          $LI.text(jsonCode[i].text);
          fillLI(jsonCode[i], $LI);
          dest.append($LI);
        }
      }
    };


    var fillLI = function(jsonCode, dest) {
      if (typeof jsonCode === "object") {
        if (jsonCode.children != undefined) {

          dest.on("click", function(e) {
            $(this).children("*").fadeIn().children().fadeIn();
            $(this).siblings("li").find("*").fadeOut();
          });
          var $UL = $("<ul></ul>").css({
            "display": "none"
          });
          $UL.find("*").css({
            "display": "none"
          });
          fillUL(jsonCode.children, $UL);
          dest.append($UL);
        }
      }
    };


    var opt = $.extend({}, $.fn.menu.defaults, options);

    $.getJSON("menu.json", function(data) {
      fillUL(data, $("ul"));
    });
    return this;
  }

  $.fn.menu.defaults = {
    enlarge: $.fn.fadeTo,
    openSpeed: 500,
    openbg: "#777777",
    mouseoutOpacity: 0.7,
    mouseOut: {
      "opacity": 0.7
    },
    openProp: {
      "speed": 500,
      "css": {
        "opacity": 0.7
      },
      "background-color": "#777777"
    }
  }

}(jQuery));
