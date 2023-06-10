import supertest from "supertest";
import app from "./app";

// Test create restaurant API
describe('POST /create', () => {
  test('should create a new restaurant', async () => {
    const response = await request(app).post('/create').send({
      name:"restaurant1",
      cuisine:"meat",
      location:"kampala",
      image:"./client/public/images/1686417626348.jpeg"
    })
    expect(response.status).toBe(200);
  });
});
