const router = require('express').Router();
const { User } = require('../db');
// const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// router.get('/userdata', requireToken, isAdmin, async (req, res, next) => {
//   try {
//     const users = await User.findAll();
//     res.status(200).send(users);
//   } catch (error) {
//     next(error);
//   }
// });
