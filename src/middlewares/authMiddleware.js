/*
Вилучає токен із заголовка:
1. Перевіряє валідність токена (тобто що ми його видали і він живий).
2. Вилучає із токена id, знаходе користувача в базі по id та прикріплює його до запиту (req.user).
*/
/*
1. Вилучити із заголовків запиту вміст заголовка Authorization.
2. Розділити його на 2 слова: bearer і токен.
3. Перевірити чи рівне слово - "Bearer".
4. Перевірити валідність другого слова - (токен).
5. Якщо токен валідний - вилучити з нього id і знайти користувача в базі з таким id
6. Якщо користувача з таким id знайшли в базі - його треба прикріпити до запиту (обєкт req).
*/
const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
const { User } = require('../schemas')
require('dotenv').config()

const { ACCESS_SECRET_KEY } = process.env

const authMiddleware = async (req, res, next) => {
  const { authorization = '' } = req.headers
  const [bearer, token] = authorization.split(' ')

  try {
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized')
    }

    const { id } = jwt.verify(token, ACCESS_SECRET_KEY)
    const user = await User.findById(id)

    if (!user || !user.accessToken) {
      throw new Unauthorized('Not authorized')
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
