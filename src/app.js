const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { errorRoutesHandler, errorHandler } = require('./middlewares')
const { contactsRouter, authRouter, usersRouter } = require('./routes')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use(errorRoutesHandler)
app.use(errorHandler)

module.exports = app
