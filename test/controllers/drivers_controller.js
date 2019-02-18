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
})