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
      .then(driver => res.status(200).send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    // .id here has to match the :id in words to make it work.
    // we could use .driverId here and in route file it would ahve to be :driverId
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findOneAndUpdate({ _id: driverId }, driverProps)
    //Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findOne({ _id: driverId }))
      .then(driver => res.status(200).send(driver))
      .catch(next);
  },

  remove(req, res, next) {
    const driverId = req.params.id;

    Driver.findOneAndDelete({ _id: driverId })
      //status 204 means deletion occured ok
      .then(driver => res.status(204).send(driver))
      .catch(next)
  },

  index(req, res, next) {
    const { lng, lat } = req.query;  // geoNear does not work with req.body so we use req.query

    // how we are going to look for drivers near a geo point
    Driver.aggregate([
      {
        '$geoNear': {
          "near": {
            'type': 'Point',
            'coordinates': [parseFloat(lng), parseFloat(lat)]
          },
          "spherical": true,
          "distanceField": 'dist',
          "maxDistance": 200000
        }
      }
    ])
      .then(drivers => res.status(200).send(drivers))
      .catch(next);
  }
};