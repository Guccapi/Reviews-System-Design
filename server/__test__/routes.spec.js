const request = require('supertest');
const server = require('..');

describe('Test reviews route', () => {
  test('It should respond to a GET request for reviews', async() => {
    const res = await request(server).get('/reviews');
    expect(res.statusCode).toBe(200);
  });
});

describe('Test metaData route', () => {
  test('It should respond to a GET request for reviews', async() => {
    const res = await request(server).get('/reviews/meta');
    expect(res.statusCode).toBe(200);
  });
});
