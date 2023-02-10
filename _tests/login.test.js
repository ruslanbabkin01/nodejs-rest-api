// 1. Написати unit-тести для контролера входу (логін) за допомогою Jest
// відповідь повина мати статус-код 200
// у відповіді повинен повертатися токен
// у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../app");
const { User } = require("../models/user");

const { DB_TEST_HOST, PORT } = process.env;

// набір тестів
describe("test auth routes", () => {
  let server;

  // підготовка перед тестуванням
  beforeAll(() => (server = app.listen(PORT)));

  // завершальні дії після тестування
  afterAll(() => server.close());

  // підготовка для кожного набору чи тестового випадку
  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  // завершальні дії для кожного набору чи випадку
  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  // тестовий випадок
  test("test login route", async () => {
    const newUser = {
      email: "ruslan@gmail.com",
      password: "121212",
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "ruslan@gmail.com",
      password: "121212",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);

    //   перевірка на строгу рівність отриманого значення value
    expect(response.statusCode).toBe(200);
    const { body } = response;

    // перевіряє значення, що повертається вважати істинним
    expect(body.token).toByTruthy();

    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });
  
});
