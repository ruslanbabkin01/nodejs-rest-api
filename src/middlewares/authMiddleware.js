// Вилучає токен із заголовка:
// 1. Перевіряє валідність токена (тобто що ми його видали і він живий)
// 2. Вилучає із токена id, знаходе користувача в базі по id та прикріплює його до запиту (req.user)
// -Вилучити із заголовків запиту вміст заголовка Authorization
// -Розділити його на 2 слова: bearer і токен
// -Перевірити чи рівне слово - "Bearer"
// -Перевірити валідність другого слова - токен
// -Якщо токен валідний - вилучити з нього id і знайти користувача в базі з таким id
// -Якщо користувача з таким id знайшли в базі - його треба прикріпити до запиту (об'єкт req)

require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User } = require('../schemas')
const { RequestError } = require('../helpers')

const { ACCESS_SECRET_KEY } = process.env

const authMiddleware = async (req, res, next) => {
  const { authorization = '' } = req.headers
  const [bearer, token] = authorization.split(' ')
  if (bearer !== 'Bearer') {
    next(RequestError(401))
  }

  try {
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY)
    const user = await User.findById(id)
    if (!user || !user.accessToken || user.accessToken !== token) {
      next(RequestError(401))
    }

    req.user = user
    next()
  } catch (error) {
    if (error.message === 'Invalid signature') {
      error.status = 401
    }
    next(error)
  }
}

module.exports = authMiddleware
