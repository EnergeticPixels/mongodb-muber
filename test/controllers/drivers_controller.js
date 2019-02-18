const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
// getting around mocha trying to get around the model required multiple times
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {

  it('post to /api/drivers creates a new driver', (done) => {
    // niave test becuz just making sure count is one upped
    Driver.count()
      .then(count => {
        request(app)
          .post('/api/drivers')
          .send({ email: 'test@test.com' })
          .end(() => {
            Driver.count()
              .then(newCount => {
                assert(count + 1 === newCount);
                done();
              });
          });
      });
    
  });
})