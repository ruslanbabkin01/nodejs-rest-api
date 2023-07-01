require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const supertest = require('supertest')
const app = require('../../app')
const { User } = require('../../schemas')
const { TOKEN_REGEX } = require('../../constants/regexs')

const { DB_HOST_TEST } = process.env

describe('login', () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST)
  })

  afterAll(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })

  it.skip('should login a new user', async () => {
    const response = await supertest(app).post('/api/users/login').send({
      email: 'user2@gmail.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      verificationToken: expect(token.accessToken).toMatch(TOKEN_REGEX),
      accessToken: expect(token.accessToken).toMatch(TOKEN_REGEX),
      user: {
        email: 'user2@gmail.com',
        name: expect.any(String),
        subscription: expect.any(String),
      },
    })
  })
})
