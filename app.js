require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const http = require('http').createServer(app);
const port = 3000;

const mongodb_uri = 'mongodb://localhost/flamencos';


app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }),
);
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS',
  );
  next();
});


app.get('/', (_, res) => {
  res.send('OK');
});

// mongoose connection
mongoose
  .connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected');
    http.listen(process.env.PORT || port, () => {
        console.log(`Flamencos is listening at ${port}`);
      });
  })
  .catch((err) => {
    console.log(`DB connection error: ${err.message}`);
  });

module.exports = app;
