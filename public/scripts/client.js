/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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
    <div class="tweet-body">${tweet.content.text}</div>
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
      $container.append(oneTweet);
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

  loadTweets();

  // submit event listener
  $(".new-tweet form").submit(function(event) {
    event.preventDefault();

    const serializedData = $(this).serialize();

    if ($(this).find("textarea").val().length > 140) {
      alert("Your message is too long.");
    }

    if (!$(this).find("textarea").val()) {
      alert("Please enter a message!");
    }

    $.post("/tweets", serializedData)
      .then(loadTweets);
  });

});
