(function($) {

  $.fn.menu = function(options) {


    let fillUL = function(jsonCode, dest) {

      let i = 0, $a=null;
      if (jsonCode instanceof Array) {
        for (i = 0; i < jsonCode.length; i += 1) {
          let $LI = $("<li></li>");

          $LI.find("*:not(a)").css({
            "display": "none"
          });


          if (jsonCode[i].children !== undefined) {
            $LI.addClass("hasChildren");
          } else {
            $LI.addClass("noChildren");
          }




          if(typeof jsonCode[i].click!=='undefined') {
                  $a=$('<a></a>');
                  $a.attr('href',jsonCode[i].click)
                  $a.text(jsonCode[i].text);
                  $LI.append($a);


          } else {
              $LI.text(jsonCode[i].text);
          }

          fillLI(jsonCode[i], $LI);
          dest.append($LI);
        }
      }
    };


    let fillLI = function(jsonCode, dest) {
      if (typeof jsonCode === "object") {
        if (jsonCode.children != undefined) {

          dest.on("click", function(e) {
            $(this).children("*").fadeIn().children().fadeIn();
            $(this).siblings("li").find("*:not(a)").fadeOut();
          });
          let $UL = $("<ul></ul>").css({
            "display": "none"
          });
          $UL.find("*:not(a)").css({
            "display": "none"
          });
          fillUL(jsonCode.children, $UL);
          dest.append($UL);
        }
      }
    };


    let opt = $.extend({}, $.fn.menu.defaults, options);

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
