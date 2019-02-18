module.exports = {

  // using es6 to do what we used to
  greeting(req, res) {
    res.send({ hi: 'There' });
  }
  // old methodology to the above code
  /*greeting: function(req, res) {
    res.send({ hi: 'There' });
  }*/
};