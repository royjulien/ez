$(function () {
  'use strict'

  ratings()
})

var ratings = function () {
  $('.rating').each(function () {
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

var isInt = function (n) {
  return n % 1 === 0;
};
