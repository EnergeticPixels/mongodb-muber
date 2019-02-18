const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost:27017/muber', {useNewUrlParser: true});
};


app.use(bodyParser.json());
routes(app);

// middleware placement makes a difference as to when it takes place.
// Here we are describing an error middleware handler
app.use((err, req, res, next) => {
  //console.log(err);
  // status 422 is great when validation error issues
  res.status(422).send({ error: err.message });
});

module.exports = app;