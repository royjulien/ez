// this needs refactoring =D
$(function () {
  'use strict'

  tabSwitch('link--tab')
  ratings('rating')
  openModal('openModal')
})

var tabSwitch = function (className) {
  // create indicator on first tab
  $('.' + className + ':first').append('<figure class="tab--indicator">')

  var indicator = $('.tab--indicator');

  // check url for hash and apply switch tab/container state
  if (window.location.hash.length > 0) {
    var hash = window.location.hash,
        existingLinks = [];

    $('.' + className).each(function () {
      existingLinks.push($(this).attr('href'))
    })

    // check if hash extists within possible tabs
    if ($.inArray(hash, existingLinks) >= 0) {
      var activeTab = $('[href=' + hash + ']'),
          index = activeTab.parent().index();

      $('.' + className + '.active').removeClass('active')
      activeTab.addClass('active')

      // move indicator to correct position
      indicator.css('transform', 'translateX(' + index * 100 + '%)')

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

    var activeTab = $('.' + className + '.active'),
        linkName = $(this).attr('href').replace('#', ''),
        index = $(this).parent().index();

    // toggle tab class
    activeTab.removeClass('active')
    $(this).addClass('active')

    // move indicator to correct position
    indicator.css('transform', 'translateX(' + index * 100 + '%)')

    // toggle container display
    $('.container').fadeOut(177)
    $('[data-page-name=' + linkName + ']').fadeIn(177)
  })
};

var ratings = function (className) {
  $('.' + className).each(function () {
    var rating = $(this).data('rating');

    // assuming the endpoint returns an integer or rounded float (3.5)
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
    $('.modal__bg').addClass('active').delay(150).queue(function () {
      $('.modal__container').addClass('active')
      $(this).dequeue()
    })
  })

  // close modal
  $('.modal__bg').on('click', function () {
    $('body').removeClass('noscroll')
    $('.modal__container').removeClass('active').delay(300).queue(function () {
      $('.modal__bg').removeClass('active')
      $(this).dequeue()
    })
  })
};

var isInt = function (n) {
  return n % 1 === 0;
};
