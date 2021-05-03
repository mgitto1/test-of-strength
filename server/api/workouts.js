const router = require('express').Router();
const { Workout } = require('../db');
const { requireToken } = require('./gatekeepingMiddleware');
// const { requireToken, isAdmin } = require('./gatekeepingMiddleware');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const workouts = await Workout.findAll();
    res.json(workouts);
  } catch (err) {
    next(err);
  }
});

router.get('/user', requireToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const workouts = await Workout.findAll({
      where: {
        userId: userId,
      },
    });
    res.json(workouts);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const workouts = await Workout.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(workouts);
  } catch (err) {
    next(err);
  }
});

router.post('/', requireToken, async (req, res, next) => {
  try {
    const workoutInfo = req.body;
    const newWorkout = await Workout.create(workoutInfo);
    await newWorkout.setUser(req.user);
    res.status(200).send(newWorkout);
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
