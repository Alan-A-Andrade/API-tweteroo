import express from 'express';

const app = express();
app.use(express.json())

const users = []

app.get("/hello", (req, res) => {
  res.send(users);
});

app.post("/sign-up", (req, res) => {

  const user = req.body;
  users.push(user)

  res.send("OK");
});

app.listen(5000);