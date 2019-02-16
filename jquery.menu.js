(function ($) {

  $.fn.menu = function (options) {


    let fillUL = function (jsonCode, dest, depth) {

      let i = 0,
        $a = null,
        $div;
        
      if (jsonCode instanceof Array) {
        for (i = 0; i < jsonCode.length; i += 1) {
          let $LI = $('<li></li>');

          $LI.find('*:not(a):not(div)').css({
            'display': 'none'
          });


          if (jsonCode[i].children !== undefined) {
            $LI.addClass('menu-plugin-has-children');
          } else {
            $LI.addClass('menu-plugin-no-children');
          }



          $div = $('<div></div>');
          $div.css({
            transform: `translateX(${Math.log(depth)*40}px)`
          });

          if (typeof jsonCode[i].click !== 'undefined') {
            $a = $('<a></a>');
            $a.attr('href', jsonCode[i].click);
            $a.attr('target', '_blank');
            $a.text(jsonCode[i].text);
            $div.append($a);
            $LI.append($div);


          } else {

            $div.text(jsonCode[i].text);
            $LI.append($div);
          }

          fillLI(jsonCode[i], $LI, depth);
          dest.append($LI);
        }
      }
    };


    let fillLI = function (jsonCode, dest, depth) {
      if (typeof jsonCode === 'object') {
        if (jsonCode.children != undefined) {

          dest.on('click', function (e) {
            $(this).children('*').fadeIn().children().fadeIn();
            $(this).siblings('li').find('*:not(a):not(div)').fadeOut();
          });
          let $UL = $('<ul></ul>').css({
            'display': 'none'
          });
          $UL.find('*:not(a):not(div)').css({
            'display': 'none'
          });
          fillUL(jsonCode.children, $UL, depth + 1);
          dest.append($UL);
        }
      }
    };


    let opt = $.extend({}, $.fn.menu.defaults, options);

    $.getJSON('menu.json', function (data) {
      fillUL(data, $('ul'), 1);
    });
    return this;
  }

  $.fn.menu.defaults = {
    enlarge: $.fn.fadeTo,
    openSpeed: 500,
    openbg: '#777777',
    mouseoutOpacity: 0.7,
    mouseOut: {
      'opacity': 0.7
    },
    openProp: {
      'speed': 500,
      'css': {
        'opacity': 0.7
      },
      'background-color': '#777777'
    }
  }

}(jQuery));
