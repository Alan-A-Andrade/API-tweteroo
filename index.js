import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(cors());

const users = []

const tweets = []

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

  //let lastTenTweets

  res.send(tweets);
});


app.listen(5000);