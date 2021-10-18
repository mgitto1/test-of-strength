const router = require('express').Router()
const {User} = require('../db')
const {isAdmin} = require('./gatekeepingMiddleware')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})
