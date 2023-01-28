/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// escape function
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(() => {
  // create tweet article element given raw tweet data
  const createTweetElement = function(tweet) {
    const timeAgo = timeago.format(tweet.created_at);
    const tweetArticle = $(`
  <article class="tweet">
    <header>
      <div class="user-info">
        <div>
          <img src="${tweet.user.avatars}" alt="user-pic" />
        </div>
        <div>${tweet.user.name}</div>
      </div>
      <div class="user-handle">${tweet.user.handle}</div>
    </header>
    <div class="tweet-body">${escape(tweet.content.text)}</div>
    <footer>
      <div><output name="time-ago">${timeAgo}</output></div>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  `);
    return tweetArticle;
  };

  // given array of tweets, append generated article element to tweets-container
  const renderTweets = function(tweets) {
    const $container = $(".tweets-container");
    $container.empty();
    for (const tweet of tweets) {
      const oneTweet = createTweetElement(tweet);
      $container.prepend(oneTweet);
    }
  };

  // get request to /tweets, render tweets on success
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        console.error(error);
      }
    });
  };

  // restore character counter to 140
  const resetCounter = function() {
    $('#chars').text(140);
  };

  // slides down error with given message
  const displayError = function(message) {
    $('#tweet-error').text(message).slideDown(600).delay(1500).slideUp(600);

  };

  // clear error message (only applies if new submission before error slides up)
  const clearError = () => {
    $('#tweet-error').text('');
  };


  loadTweets();

  // submit-event listener -- accept input if <140 char, reload with new tweet
  // empty text box, reset char counter
  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    const tweetText = $(this).find("textarea");

    if (!tweetText.val()) {
      displayError("Please enter a message!");
    } else if (tweetText.val().length > 140) {
      displayError("Your message is too long.");
    } else {
      $.post("/tweets", serializedData)
        .then(() => {
          tweetText.val('');
          resetCounter();
          clearError();
          loadTweets();
        });
    }

  });

});
