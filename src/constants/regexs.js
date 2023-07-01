const TOKEN_REGEX = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const PHONE_REGEX = /^\+380\d{9}$/

const NAME_REGEX = /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/

module.exports = {
  TOKEN_REGEX,
  EMAIL_REGEX,
  PHONE_REGEX,
  NAME_REGEX,
}
