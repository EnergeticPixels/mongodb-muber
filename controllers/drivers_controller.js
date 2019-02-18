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

  create(req, res, next) {
    //console.log(req.body);
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    // .id here has to match the :id in words to make it work.
    // we could use .driverId here and in route file it would ahve to be :driverId
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId}))
      .then(driver => res.send(driver))
      .catch(next);
  }
};