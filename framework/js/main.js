// this needs refactoring =D
$(function () {
  'use strict'

  tabSwitch('link--tab')
  ratings('rating')
  modalActions()
  modalSectionSwitch('data-section-switch')
  modalSwitch('data-modal-switch')
  checkDummyForm('modal__input')
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

  var activeTab, linkName, index;

  // switch tab/container state onclick
  $('.' + className).on('click', function () {
    // prevent from triggering on current tab
    if ($(this).hasClass('active')) return

    activeTab = $('.' + className + '.active')
    linkName = $(this).attr('href').replace('#', '')
    index = $(this).parent().index()

    // toggle tab class
    activeTab.removeClass('active')
    $(this).addClass('active')

    // move indicator to correct position
    indicator.css('transform', 'translateX(' + index * 100 + '%)')

    // toggle container display
    $('.container').fadeOut(177)
    $('[data-page-name=' + linkName + ']').fadeIn(177)
  })
},

ratings = function (className) {
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
},

modalActions = function () {
  // open modal
  $('[data-modal-open]').on('click', function () {
    $('body').addClass('noscroll')

    $('.modal__bg').addClass('active').delay(150).queue(function () {
      $('[data-modal-name=single], .modal__content:first, .modal__headers .modal__header:first, .modal__headers .modal__header:first .title').addClass('active')
      $('.modal__content:gt(0), .modal__header:gt(0) .title').addClass('inactive')
      $.dequeue(this)
    }).delay(50).queue(function () {
      // focus on first input field if exists
      if ($('.modal__content').find('.modal__form').length)
        $('.modal__input:first').focus()

      $.dequeue(this)
    })
  })

  // close all modals and reset states
  $('.modal__bg').on('click', function () {
    $('body').removeClass('noscroll')
    $('.modal__container').removeClass('active').delay(300).queue(function () {
      $('.modal__bg, .modal__content, .modal__header, .modal__header .title').removeClass('passive active')
      $.dequeue(this)
    })
  })

  // close current modal
  $('[data-modal-close]').on('click', function () {
    $(this).parents('.modal__container').removeClass('active')
    if ($(this).parents('.modal__container').data('modal-name') === $('.modal__container:first').data('modal-name')) {
      $('body').removeClass('noscroll')
      $('.modal__container').removeClass('active').delay(300).queue(function () {
        $('.modal__bg, .modal__content, .modal__header, .modal__header .title').removeClass('passive active')
        $.dequeue(this)
      })
    } else {
      $(this).find('.modal__content').removeClass('passive active')
      $(this).find('.modal__header').removeClass('passive active')
      $(this).find('.modal__header .title').removeClass('passive active')
    }
  })
},

modalSectionSwitch = function (attr) {
  var attrValue, activeContent, activeContentIndex, activeHeader, activeTitle, activateContent, activateContentIndex, activateHeader, activateTitle;

  $('[' + attr + ']').on('click', function (e) {
    e.preventDefault()

    attrValue = $(this).data('section-switch')

    activeContent = $(this).parents('.modal__container').find('.modal__content.active')
    console.log(activeContent)
    activeContentIndex = activeContent.index()
    activeHeader = $(this).parents('.modal__container').find('.modal__header.active')
    console.log(activeHeader)
    activeTitle = $(this).parents('.modal__container').find('.title.active')
    console.log(activeTitle)

    activateContent = $('.modal__content[data-section-name=' + attrValue + ']')
    activateContentIndex = activateContent.index()
    activateHeader = $('.modal__header[data-section-name=' + attrValue + ']')
    activateTitle = $('.modal__header[data-section-name=' + attrValue + '] .title')

    if (activeContentIndex < activateContentIndex) {
      activeContent.addClass('passive easeToPassive').removeClass('active').delay(750).queue(function () {
        $(this).removeClass('easeToPassive').dequeue()
      })
      activeHeader.removeClass('active')
      activeTitle.addClass('passive').removeClass('active')

      activateContent.addClass('active easeToActive').removeClass('inactive').delay(750).queue(function () {
        $(this).removeClass('easeToActive').dequeue()
      })
      activateHeader.addClass('active')
      activateTitle.addClass('active').removeClass('inactive')
    } else {
      activeContent.addClass('inactive easeToActive').removeClass('active').delay(750).queue(function () {
        $(this).removeClass('easeToActive').dequeue()
      })
      activeHeader.removeClass('active')
      activeTitle.addClass('inactive').removeClass('active')

      activateContent.addClass('active easeToPassive').removeClass('passive').delay(750).queue(function () {
        $(this).removeClass('easeToPassive').dequeue()
      })
      activateHeader.addClass('active')
      activateTitle.addClass('active').removeClass('passive')
    }
  })
},

modalSwitch = function (attr) {
  var attrValue;

  $('[' + attr + ']').on('click', function (e) {
    e.preventDefault()
    attrValue = $(this).data('modal-switch')

    $('[data-modal-name=' + attrValue + '], [data-section-name=' + attrValue + '], [data-section-name=' + attrValue + '] .title').removeClass('inactive').addClass('active')
  })
},

checkDummyForm = function (className) {
  var charCount;

  $('.' + className).on('keypress focusout', function () {
    charCount = $(this).val().length

    if (charCount > 3) {
      if ($(this).hasClass('invalid'))
        $(this).removeClass('invalid')

      $(this).addClass('valid')
    } else {
      $(this).addClass('invalid')
    }
  })
},

isInt = function (n) {
  return n % 1 === 0;
};
