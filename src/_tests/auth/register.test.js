require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const supertest = require('supertest')
const app = require('../../app')
const { User } = require('../../schemas')

const { DB_HOST_TEST } = process.env

describe('register', () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST)
  })

  afterAll(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })

  it('should register a new user', async () => {
    const response = await supertest(app).post('/api/users/register').send({
      name: 'User',
      email: 'user1@gmail.com',
      password: '123456',
    })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
      user: {
        id: expect.any(String),
        email: 'user1@gmail.com',
        name: expect.any(String),
        subscription: expect.any(String),
        verificationToken: expect.any(String),
      },
    })
  })

  it('should register a new user2', async () => {
    await supertest(app).post('/api/users/register').send({
      name: 'User',
      email: 'user2@gmail.com',
      password: '123456',
    })

    const response = await supertest(app).post('/api/users/register').send({
      name: 'User',
      email: 'user2@gmail.com',
      password: '123456',
    })

    expect(response.status).toEqual(409)
  })
})
