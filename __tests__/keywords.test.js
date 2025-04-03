const request = require('supertest');
const app = require('../server');

describe('Keywords API', () => {
  it('should generate SEO keywords', async () => {
    const res = await request(app)
      .post('/api/generate/keywords')
      .send({ topic: 'AI in Healthcare' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('keywords');
  });
});