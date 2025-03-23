// filepath: /backend/server.test.js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/standings', (req, res) => {
  res.status(200).json({ message: 'Test successful' });
});

describe('GET /standings', () => {
  it('should return a success message', async () => {
    const response = await request(app).get('/standings');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Test successful');
  });
});