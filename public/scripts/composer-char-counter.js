$(document).ready(function() {
  console.log("js file loaded");
  const maxLength = 140;
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

