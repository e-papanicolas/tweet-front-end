# TweetStream

This app was created to allow users to stream tweets from Twitter in real time using web sockets. Users are able to create a profile complete with profile picture uploads. The main feature is the event stream, where users fill out a form with an event name, and a hashtag to follow, as well as a streaming time which sets a timeout on the TwitterStream. Once the event page is loaded users can start streaming and all tweets matching the hashtag will be displayed on the screen as soon as they are recieved on the back end and broadcasted to the client.

To run this app, run `npm install` and `npm start`.

## Technologies/Features

- JavaScript/React
- Greensock & Anime.js
- Action Cable web sockets
- Twitter Streaming API
- Material UI login and signup components
- Custom CSS Light/Dark Mode

[Back-end here](https://github.com/e-papanicolas/tweet-back-end).
