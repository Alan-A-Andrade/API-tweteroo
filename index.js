import express from 'express';

const app = express();

app.get("/hello", (req, res) => {
  res.send('**Meu primeiro servidor, yay!**');
});

app.listen(5001);