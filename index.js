import express from 'express';
import cors from 'cors';

import validationServices from './services.js';

const { checkBody, checkIsNotBlank } = validationServices

const app = express();

app.use(express.json())
app.use(cors());

const users = []

const tweets = []

function filterLastTweets(number, page) {

  let upperLimitOfTweets = (number + (number * (page - 1)))
  let bottomLimitOfTweets = (number * (page - 1))

  let tweetsList = []

  let revTweets = [...tweets].reverse()

  for (let i = 0 + bottomLimitOfTweets; i < upperLimitOfTweets; i++) {

    if (i > tweets.length - 1) {
      return tweetsList
    }
    let userTweet = {

      "username": revTweets[i].username,
      "avatar": users.find(e => e.username === revTweets[i].username).avatar,
      "tweet": revTweets[i].tweet,

    }

    tweetsList.push(userTweet)

  }

  return tweetsList
}

function filterUserTweets(userName) {

  let tweetsList = []

  let revTweets = [...tweets].reverse()

  let revUserTweets = revTweets.filter(e => e.username === userName)

  for (let i = 0; i < revUserTweets.length; i++) {

    if (i > tweets.length - 1) {
      return tweetsList
    }
    let userTweet = {

      "username": revUserTweets[i].username,
      "avatar": users.find(e => e.username === userName).avatar,
      "tweet": revUserTweets[i].tweet,

    }

    tweetsList.push(userTweet)

  }

  return tweetsList
}

app.get("/hello", (req, res) => {
  res.send(users);
});
app.get("/bye", (req, res) => {
  res.send(tweets);
});

app.post("/sign-up", (req, res) => {

  const user = req.body;
  if (user && checkBody(["username", "avatar"], user)) {
    if (checkIsNotBlank(user.username) && checkIsNotBlank(user.avatar)) {

      users.push(user)
      res.send("OK");
    }
    else {
      res.status(400).send("Todos os campos são obrigatórios!")
    }
  }
  else {
    res.status(400).send("Todos os campos são obrigatórios!")
  }
});

app.post("/tweets", (req, res) => {

  const userTweet = req.body;
  const userName = req.header('User')

  if (checkIsNotBlank(userTweet.tweet) && checkIsNotBlank(userName)) {

    let dataTweet = {
      username: userName,
      tweet: userTweet.tweet
    }
    tweets.push(dataTweet)

    res.status(201).send("Ok");
  }
  else {
    res.status(400).json("Todos os campos são obrigatórios!")
  }
}

);


app.get("/tweets", (req, res) => {

  const page = parseInt(req.query.page)

  if (!page) {
    res.send(filterLastTweets(10, 1));
  }
  else {

    if (page >= 1) {
      res.send(filterLastTweets(10, page))
    }
    else {
      res.status(400).json("Informe uma página válida!")
    }

  }

});

app.get('/tweets/:userName', (req, res) => {
  const name = req.params.userName;

  if (checkIsNotBlank(name)) {

    res.send(filterUserTweets(name));
  }
  else {
    res.status(400).json("Todos os campos são obrigatórios!")
  }
});


app.listen(5000);