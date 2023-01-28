/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

// create tweet article element given raw tweet data
const createTweetElement = function (tweetData) {
  const tweetArticle = $(`
  <article class="tweet">
    <header>
      <div class="user-info">
        <div>
          <img src="${tweetData.user.avatars}" alt="user-pic" />
        </div>
        <div>${tweetData.user.name}</div>
      </div>
      <div class="user-handle">${tweetData.user.handle}</div>
    </header>
    <div class="tweet-body">${tweetData.content.text}</div>
    <footer>
      <div><output name="days-ago">${tweetData.create_at}</output> ago</div>
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
const renderTweets = function (tweets) {
  const $container = $('#tweets-container');
  $container.empty();
  for (const tweet in tweets) {
    const oneTweet = createTweetElement(tweet);
    $container.append(oneTweet);
  }
};