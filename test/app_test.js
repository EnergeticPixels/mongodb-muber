const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('the express server', () => {

  it('handles a GET request to /api', (done) => {
    request(app)
      .get('/api')
      .end((err, response) => {
        //console.log(response);
        assert(response.body.hi === 'There');
        done();
      });
  });
})