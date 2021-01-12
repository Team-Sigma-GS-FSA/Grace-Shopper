'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const fs = require('fs')

const parseCsv = csvData => {
  const rows = csvData.split('\n')
  const keys = csvData.unshift().split(',')
  const parsedCsv = []
  rows.forEach(row => {
    const values = row.split(',')
    const entries = new Map([keys, values])
    const newObj = Object.fromEntries(entries)
    parsedCsv.push(newObj)
  })
  return parsedCsv
}

const seed = async () => {
  await db.sync({force: true})
  console.log('db synced!')

  try {
    const userSeedCsv = fs.readFileSync('./userSeed.csv', 'utf-8')
    const userSeedObjs = parseCsv(userSeedCsv)
    const users = await User.bulkCreate(userSeedObjs)
    console.log(`seeded ${users.length} users`)
    console.log(`seeded successfully`)
  } catch (error) {
    console.error(error)
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
