$(document).ready(function() {
  const maxLength = 140;

  // check length of text at each key up, change #chars displayed
  // display red if remaining chars is negative
  $('#tweet-text').keyup(function() {
    let length = $(this).val().length;
    let charsLeft = maxLength - length;
    $('#chars').text(charsLeft);
    if (charsLeft < 0) {
      $('#chars').css({
        'color': '#FF0000'
      });
    } else {
      $('#chars').css({
        'color': '#545149'
      });
    }
  });
});

