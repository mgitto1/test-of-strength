const {db, User, Workout} = require('../server/db')
// const Product = require('../server/db/models/product')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({force: true}) // clears db and matches models to tables
  const users = await Promise.all([
    User.create({name: 'Cody', username: 'cody@gmail.com', password: '123'}),
    User.create({
      name: 'Murphy',
      username: 'murphy@gmail.com',
      password: '123'
    }),
    User.create({
      name: 'Kerri',
      username: 'kerri@gmail.com',
      password: '123'
    }),
    User.create({
      name: 'Robert',
      username: 'robert@gmail.com',
      password: '123'
    })
  ])

  const workouts = await Workout.bulkCreate([
    {
      squats: 20,
      pushups: 0,
      dips: 0
    },
    {
      squats: 0,
      pushups: 20,
      dips: 0
    },
    {
      squats: 0,
      pushups: 0,
      dips: 30
    },
    {
      squats: 10,
      pushups: 0,
      dips: 0
    },
    {
      squats: 0,
      pushups: 10,
      dips: 0
    },
    {
      squats: 0,
      pushups: 0,
      dips: 15
    },
    {
      squats: 5,
      pushups: 0,
      dips: 0
    },
    {
      squats: 0,
      pushups: 5,
      dips: 0
    },
    {
      squats: 0,
      pushups: 0,
      dips: 10
    },
    {
      squats: 1,
      pushups: 0,
      dips: 0
    },
    {
      squats: 0,
      pushups: 3,
      dips: 0
    },
    {
      squats: 0,
      pushups: 0,
      dips: 4
    }
  ])

  await workouts[0].setUser(users[0])
  await workouts[1].setUser(users[0])
  await workouts[2].setUser(users[0])
  await workouts[3].setUser(users[1])
  await workouts[4].setUser(users[1])
  await workouts[5].setUser(users[1])
  await workouts[6].setUser(users[2])
  await workouts[7].setUser(users[2])
  await workouts[8].setUser(users[2])
  await workouts[9].setUser(users[3])
  await workouts[10].setUser(users[3])
  await workouts[11].setUser(users[3])

  console.log('db synced!')

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  console.log(`seeded ${workouts.length} products`)
  console.log(`seeded successfully`)
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
