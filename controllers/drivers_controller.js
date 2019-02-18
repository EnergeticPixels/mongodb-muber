const Driver = require('../models/driver');

module.exports = {

  // using es6 to do what we used to
  greeting(req, res) {
    res.send({ hi: 'There' });
  },
  // old methodology to the above code
  /*greeting: function(req, res) {
    res.send({ hi: 'There' });
  }*/

  create(req, res) {
    //console.log(req.body);
    const driverProps = req.body;

    Driver.save(driverProps)
      .then(driver => res.send(driver));
  }
};