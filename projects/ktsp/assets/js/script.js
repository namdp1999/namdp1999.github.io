// Slide 5 column
$('.five-column').slick({
  slidesToShow: 5,
  slidesToScroll: 5,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }

  ]
});

// Slide 6 column
$('.six-column').slick({
  slidesToShow: 6,
  slidesToScroll: 6,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }

  ]
});

// Slide 8 column
$('.eight-column').slick({
  slidesToShow: 8,
  slidesToScroll: 8,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }

  ]
});

// Menu mobile
$(document).ready(function() {
  $('#header__menu').on('click', function() {
    $('#header__menu').addClass('open');
    $('.header__bottom__ovelay').addClass('active');
  });
  $('.header__bottom__ovelay').on('click', function() {
    $('#header__menu').removeClass('open');
    $('.header__bottom__ovelay').removeClass('active');
  });
});
