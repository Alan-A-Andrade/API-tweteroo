import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(cors());

const users = []

const tweets = []

function filterLastTweets(number) {

  let tweetsList = []

  for (let i = 0; i < number; i++) {

    if (i > tweets.length - 1) {
      return tweetsList
    }
    let userTweet = {

      "username": tweets[tweets.length - 1 - i].username,
      "avatar": users.find(e => e.username === tweets[tweets.length - 1 - i].username).avatar,
      "tweet": tweets[tweets.length - 1 - i].tweet,

    }

    tweetsList.push(userTweet)

  }

  return tweetsList
}

app.get("/hello", (req, res) => {
  res.send(users);
});

app.post("/sign-up", (req, res) => {

  const user = req.body;
  users.push(user)

  res.send("OK");
});

app.post("/tweets", (req, res) => {

  const userTweet = req.body;
  tweets.push(userTweet)

  res.send("OK");
});

app.get("/tweets", (req, res) => {


  res.send(filterLastTweets(10));
});


app.listen(5000);