/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  // create tweet article element given raw tweet data
  const createTweetElement = function(tweet) {
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
      <div><output name="days-ago">${tweet.created_at}</output> ago</div>
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

  const loadTweets = function() {
    $.get("/tweets", function(data, status) {
      renderTweets(data);
    });
  };

  loadTweets();

  // submit event listener
  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    console.log($(this).find("textarea").val());
    const serializedData = $(this).serialize();
    console.log(serializedData);
    $.post("/tweets", serializedData)
      .then(renderTweets(data));
  });

});
