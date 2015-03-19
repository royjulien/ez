$(function () {
  'use strict'

  tabSwitch('link--tab')
  ratings('rating')
  openModal('openModal')
})

var tabSwitch = function (className) {
  // check url for hash and apply switch tab/container state
  if (window.location.hash.length > 0) {
    var hash = window.location.hash,
        existingLinks = [];

    $('.' + className).each(function () {
      existingLinks.push($(this).attr('href'))
    })

    // check if hash extists within possible tabs
    if ($.inArray(hash, existingLinks) >= 0) {
      $('.' + className + '.active').removeClass('active')
      $('[href=' + hash + ']').addClass('active')

      hash = hash.replace('#', '')
      $('[data-page-name=' + hash + ']').fadeIn(177)
    }
  } else {
    $('.' + className + ':first').addClass('active')
    $('.container:first').fadeIn(177)
  }

  // switch tab/container state onclick
  $('.' + className).on('click', function () {
    // prevent from triggering on current tab
    if ($(this).hasClass('active')) return

    var linkName = $(this).attr('href').replace('#', '');

    // toggle tab class
    $('.' + className + '.active').removeClass('active')
    $(this).addClass('active')

    // toggle container display
    $('.container').fadeOut(177)
    $('[data-page-name=' + linkName + ']').fadeIn(177)
  })
};

var ratings = function (className) {
  $('.' + className).each(function () {
    var rating = $(this).data('rating');

    // Assuming the endpoint returns an integer or rounded float
    if (!isNaN(rating) && rating > 0) {
      var star = $(this).find('.ez-star');

      if (isInt(rating)) {
        for (var i = 0; i < rating; i += 1) {
          $(star[i]).addClass('active')
        }
      } else {
        for (var i = 0; i < rating; i += 1) {
          $(star[i]).addClass('active')

          if (i > rating - 1)
            $(star[i]).attr('class', 'ez-star--half').addClass('active')
        }
      }
    }
  })
};

var openModal = function (attr) {
  // open modal
  $('[data-action=' + attr + ']').on('click', function () {
    $('body').addClass('noscroll')
    $('.modal__bg, .modal__container').addClass('active')
  })

  // close modal
  $('.modal__bg').on('click', function () {
    $('body').removeClass('noscroll')
    $('.modal__container').removeClass('active').delay(233).queue(function () {
      $('.modal__bg').removeClass('active')
      $(this).dequeue()
    })
  })
};

var isInt = function (n) {
  return n % 1 === 0;
};
