(function ($) {
  "use strict";

  /*===========================================
        Table of contents
    01. On Load Function
    02. Preloader
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image
    07. Popup Sidemenu
    08. Search Box Popup
    09. Counter Up Active
    10. Hero Slider Active
    11. Select Box Active
    12. Date & Time Picker
    13. Magnific Popup
    14. Progress Bar Active
    15. Sub Menu Position
    16. Product Ship Another Toggle
    17. Quantity Adder
    18. Rating Input Class Added
    19. One Page Nav
    20. VS Button
    21. Progress Bar
    22. Range Slider
    23. Right Click Disable
    24. Inspect Element Disable
  =============================================*/


  /*---------- 01. On Load Function ----------*/
  $(window).on('load', function () {
    $('.preloader').fadeOut();
  });



  /*---------- 02. Preloader ----------*/
  if ($('.preloader').length > 0) {
    $('.preloaderCls').each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.preloader').css('display', 'none');
      })
    });
  };



  /*---------- 03. Mobile Menu Active ----------*/
  $('.mobile-menu-active').vsmobilemenu({
    menuContainer: '.vs-mobile-menu',
    expandScreenWidth: 992,
    menuToggleBtn: '.vs-menu-toggle',
  });



  /*---------- 04. Sticky fix ----------*/
  var lastScrollTop = '';
  var scrollToTopBtn = '.scrollToTop'

  function stickyMenu($targetMenu, $toggleClass) {
    var st = $(window).scrollTop();
    if ($(window).scrollTop() > 600) {
      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);

      } else {
        $targetMenu.addClass($toggleClass);
      };
    } else {
      $targetMenu.removeClass($toggleClass);
    };
    lastScrollTop = st;
  };
  $(window).on("scroll", function () {
    stickyMenu($('.sticky-header'), "active");
    if ($(this).scrollTop() > 400) {
      $(scrollToTopBtn).addClass('show');
    } else {
      $(scrollToTopBtn).removeClass('show');
    }
  });



  /*---------- 05. Scroll To Top ----------*/
  $(scrollToTopBtn).on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 3000);
    return false;
  });




  /*---------- 06.Set Background Image ----------*/
  if ($('.background-image').length > 0) {
    $('.background-image').each(function () {
      var src = $(this).attr('data-vs-img');
      $(this).css({
        'background-image': 'url(' + src + ')'
      });
    });
  };





  /*---------- 07. Popup Sidemenu ----------*/
  function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
    // Sidebar Popup
    $($sideMunuOpen).on('click', function (e) {
      e.preventDefault();
      $($sideMenu).addClass($toggleCls);
      $('body').addClass('overflow-hidden');
    });
    $($sideMenu).on('click', function (e) {
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls)
      $('body').removeClass('overflow-hidden');
    });
    var sideMenuChild = $sideMenu + ' > div';
    $(sideMenuChild).on('click', function (e) {
      e.stopPropagation();
      $($sideMenu).addClass($toggleCls)
      $('body').addClass('overflow-hidden');
    });
    $($sideMenuCls).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
      $('body').removeClass('overflow-hidden');
    });
  };
  popupSideMenu('.sidemenu-wrapper', '.sideMenuToggler', '.sideMenuCls', 'show');





  /*---------- 08. Search Box Popup ----------*/
  function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
    $($searchOpen).on('click', function (e) {
      e.preventDefault();
      $($searchBox).addClass($toggleCls);
    });
    $($searchBox).on('click', function (e) {
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
    $($searchBox).find('form').on('click', function (e) {
      e.stopPropagation();
      $($searchBox).addClass($toggleCls);
    });
    $($searchCls).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
  };
  popupSarchBox('.popup-search-box', '.searchBoxTggler', '.searchClose', 'show');



  /*----------- 09. Counter Up Active ----------*/
  $('.counter').counterUp({
    delay: 10,
    time: 1000
  });



  /*----------- 10. Hero Slider Active ----------*/
  $('.vs-hero-carousel').each(function () {
    var vsHslide = $(this),
      container = vsHslide.data('container'),
      responsiveunder = vsHslide.data('responsiveunder'),
      height = vsHslide.data('height'),
      loop = vsHslide.data('loop'),
      navbuttons = vsHslide.data('navbuttons'),
      allowfullscreen = vsHslide.data('allowfullscreen'),
      startinviewport = vsHslide.data('startinviewport'),
      navstartstop = vsHslide.data('navstartstop'),
      hoverbottomnav = vsHslide.data('hoverbottomnav'),
      hoverprevnext = vsHslide.data('hoverprevnext'),
      navprevnext = vsHslide.data('navprevnext'),
      pauseonhover = vsHslide.data('pauseonhover'),
      autostart = vsHslide.data('autostart'),
      thumbnailnavigation = vsHslide.data('thumbnailnavigation'),
      slidertype = vsHslide.data('slidertype'),
      maxratio = vsHslide.data('maxratio'),
      showcircletimer = vsHslide.data('showcircletimer');

    vsHslide.layerSlider({
      maxRatio: (maxratio ? maxratio : 1),
      type: (slidertype ? slidertype : 'responsive'),
      startInViewport: (startinviewport ? startinviewport : false),
      allowFullscreen: (allowfullscreen ? allowfullscreen : false),
      pauseOnHover: (pauseonhover ? true : false),
      navPrevNext: (navprevnext ? true : false),
      hoverPrevNext: (hoverprevnext ? true : false),
      hoverBottomNav: (hoverbottomnav ? true : false),
      navStartStop: (navstartstop ? true : false),
      navButtons: (navbuttons ? true : false),
      loop: (loop ? false : true),
      autostart: (autostart ? true : false),
      height: (height ? height : 980),
      responsiveUnder: (responsiveunder ? responsiveunder : 1920),
      layersContainer: (container ? container : 1920),
      showCircleTimer: (showcircletimer ? true : false),
      skinsPath: 'layerslider/skins/',
      thumbnailNavigation: (thumbnailnavigation ? false : true),
    });
  });




  /*----------- 11. Select Box Active ----------*/
  if ($('select').length > 0) {
    $('select').niceSelect();
    $('select').parent().addClass('select-box-area');
  };



  /*---------- 12. Date & Time Picker ----------*/
  // Time And Date Picker
  $('.dateTime-pick').datetimepicker({
    timepicker: true,
    datepicker: true,
    format: 'y-m-d H:i',
    hours12: false,
    step: 30
  });

  // Only Date Picker
  $('.date-pick').datetimepicker({
    timepicker: false,
    datepicker: true,
    format: 'm-d-y',
    step: 10
  });

  // Only Time Picker
  $('.time-pick').datetimepicker({
    datepicker: false,
    timepicker: true,
    format: 'H:i',
    hours12: false,
    step: 10
  });



  /*----------- 13. Magnific Popup ----------*/
  /* magnificPopup img view */
  $('.popup-image').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  /* magnificPopup video view */
  $('.popup-video').magnificPopup({
    type: 'iframe'
  });




  /*----------- 14.  Progress Bar Active ----------*/
  $('.bar-progress .progress-value').each(function () {
    var width = $(this).attr('data-value');
    $(this).css('width', width + '%')
  })



  /*----------- 15. Sub Menu Position ----------*/
  function subMenu() {
    let $subMain = $('.main-menu > .menu-item-has-children > ul');
    let $subSub = $('.main-menu .menu-item-has-children > ul > ul');
    $subMain.each(function () {
      if ($(window).width() > 991) {
        if ($(this).offset().left + $(this).width() > $(window).width()) {
          $(this).css({
            'left': 'auto',
            'right': '100%'
          });
        } else {
          $(this).css({
            'left': '0',
            'right': 'auto'
          });
        }
      }
    })
    $subSub.each(function () {
      if ($(window).width() > 991) {
        if ($(this).offset().left + $(this).width() > $(window).width()) {
          $(this).css({
            'left': 'auto',
            'right': '100%'
          });
          $(this).find('.sub-menu').css({
            'left': 'auto',
            'right': '100%'
          });
        }
      }
    })
  }
  subMenu();
  $(window).on('resize', function () {
    subMenu();
  });


  /*----------- 16. Product Ship Another Toggle ----------*/
  $('#buyerShipAnother').on('click', function () {
    $('.vs-billing-differentAddress').toggle();
  });



  /*----------- 17. Quantity Adder ----------*/
  $('.quantity-plus').each(function () {
    $(this).on('click', function () {
      var $qty = $(this).siblings(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal)) {
        $qty.val(currentVal + 1);
      }
    })
  });

  $('.quantity-minus').each(function () {
    $(this).on('click', function () {
      var $qty = $(this).siblings(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal) && currentVal > 1) {
        $qty.val(currentVal - 1);
      }
    });
  })

  /*----------- 18. Rating Input Class Added ----------*/
  if ($('.vs-rating-input').length > 0) {
    $('.vs-rating-input').each(function () {
      $(this).find('span').on('click', function () {
        $('.vs-rating-input span').addClass('active');
        $(this).nextAll('span').removeClass('active');
      });
    });
  };


  /*----------- 19. One Page Nav ----------*/
  function onePageNav(element) {
    if ($(element).length > 0) {
      $(element).each(function () {
        $(this).find('a').each(function () {
          $(this).on('click', function () {
            var target = $(this.getAttribute('href'));
            if (target.length) {
              event.preventDefault();
              $('html, body').stop().animate({
                scrollTop: target.offset().top - 10
              }, 1000);
            };

          });
        });
      })
    }
  };
  onePageNav('.onepage-nav, .main-menu, .vs-mobile-menu');



  /*----------- 20. VS Button  ----------*/
  function buttonAnimation(btn) {
    $(btn).each(function () {
      $(this).contents().filter(function () {
        return this.nodeType !== 1;
      }).wrap('<span class="vs-btn-text"></span>');
      $(this).find('i').wrap('<span class="vs-btn-icon" />');
      var btnhtml = $(this).html();
      $(this).html('');
      $(this).prepend('<span class="vs-btn-shape"></span><span class="vs-btn-shape"></span><span class="vs-btn-shape"></span> <span class="vs-btn-shape"></span>' + btnhtml);
    })
  };
  if ($('.vs-btn').length > 0) {
    buttonAnimation('.vs-btn');
  };


  /*----------- 21. Progress Bar  ----------*/
  $('.vs-progress .progress-value').each(function () {
    var width = $(this).attr('data-valuenow');
    $(this).css('width', width + '%')
  })


  /*----------- 22. Range Slider  ----------*/
  $("#slider-range").slider({
    range: true,
    min: 40,
    max: 600,
    values: [60, 570],
    slide: function (event, ui) {
      $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
    }
  });
  $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));





  /*----------- 23. Right Click Disable ----------*/
  window.addEventListener('contextmenu', function (e) {
    // do something here... 
    e.preventDefault();
  }, false);


  /*----------- 24. Inspect Element Disable ----------*/
  document.onkeydown = function (e) {
    if (event.keyCode == 123) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
      return false;
    }
  }


})(jQuery);