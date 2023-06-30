const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { errorRoutesHandler, errorHandler } = require('./middlewares')

const app = express()

const contactsRouter = require('./routes/contacts')
const authRouter = require('./routes/auth')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)

app.use(errorRoutesHandler)
app.use(errorHandler)

module.exports = app
