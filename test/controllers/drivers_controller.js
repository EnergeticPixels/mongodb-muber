const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
// getting around mocha trying to get around the model required multiple times
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {

  it('post to /api/drivers creates a new driver', (done) => {
    // niave test becuz just making sure count is one upped
    Driver.countDocuments()
      .then(count => {
        request(app)
          .post('/api/drivers')
          .send({ email: 'test@test.com' })
          .end(() => {
            Driver.countDocuments()
              .then(newCount => {
                //console.log('Count is ' + count);
                //console.log('newCount is ' + newCount);
                assert(count + 1 === newCount);
                done();
              });
          });
      });
    
  });

  it('put to /api/drivers/id edits our driver', (done) => {
    // create driver
    const driver = new Driver({ email: 't@t.com', driving: false });
    driver.save()
      .then(() => {
        // change get the just saved record
        request(app)
          .put(`/api/drivers/${driver._id}`)
          .send({ driving: true })
          .end(() => {
            // retrieve the changed data to make sure its good saved.
            Driver.findOne({ email: 't@t.com' })
              .then(driver => {
                assert(driver.driving === true);
                done();
              });
          });
      });
  });

  it('delete to /api/drivers/id removes a driver', (done) => {
    // create driver
    const driver = new Driver({ email: 't@t.com', driving: false });
    driver.save()
      .then(() => {
        // remove the just saved driver
        request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end(() => {
            // retrieve the changed data to make sure its good saved.
            Driver.findOne({ email: 't@t.com' })
              .then(driver => {
                //console.log(driver);
                assert(driver === null);
                done();
              });
          });
      });
  });

  it.only('GET to /api/drivers finds drivers in a location', (done) => {
    const seattleDriver = new Driver({
      email: 'seattle@seattle.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147528]}
    });
    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
    });

    Promise.all([ seattleDriver.save(), miamiDriver.save()])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, response) => {
            //console.log(response);
            //console.log(err);
            console.log(response.body);
            //assert(response.body.length === 1);
            assert(response.body[0].email === 'miami@test.com');
            done();
          })
      })
  })
})