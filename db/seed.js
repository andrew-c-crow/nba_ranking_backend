// inside db/seed.js
const { client } = require('./client');
const { createUser, getAllUsers, createPlayer, getAllPlayers} = require('./index')

async function dropTables() {
  try{
    console.log("Dropping All Tables...")

    await client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS players;
    `)
    console.log("Finished Dropping All Tables...")
  }catch(error) {
    throw error;
  }
}


async function createTables() {
  try{
    console.log("Starting to build tables...")

    await client.query(`
    CREATE TABLE players(
      id SERIAL PRIMARY KEY,
      "firstName" VARCHAR(255) NOT NULL,
      "lastName" VARCHAR(255) NOT NULL,
      position VARCHAR(255) NOT NULL,
      "heightFeet" INTEGER NOT NULL,
      "heightInches" INTEGER NOT NULL,
      "weightPounds" INTEGER NOT NULL,
      team VARCHAR(255) NOT NULL,
      "imageURL" VARCHAR(255) NOT NULL
    );
    `)

    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "firstName" VARCHAR(255) NOT NULL,
      "lastName" VARCHAR(255) NOT NULL
    );
    `)

    console.log("Finished building tables!")
  }catch (error) {
    console.log("Error building tables!")
    throw error;
  }
}

async function createInitialUsers(){
  console.log("Starting to create initial user")
  try{
    const andrew = await createUser({
      username: "AndrewCrow",
      password: "Andrew1",
      firstName: "Andrew",
      lastName: "Crow"
    })
    const chelsea = await createUser({
      username: "ChelseaCrow",
      password: "Chelsea1",
      firstName: "Chelsea",
      lastName: "Crow"
    })

  console.log("Finished creating initial users")
  } catch(error){
    console.error(error)
    throw error
  }
}

async function createInitialPlayers () {
  console.log("Creating initial players...")
  try {
    const lebronJames = await createPlayer(
      firstName = "Lebron",
      lastName = "James",
      position = "F",
      heightFeet = "6",
      heightInches = "9",
      weightPounds = "250",
      team = "Los Angeles Lakers",
      imageUrl = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/2544.png"
    )

    console.log("Finished creating initial players!")
  } catch {

  }
}

async function rebuildDB() {
  try{
    client.connect();

    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialPlayers()

    console.log("Finished Rebuilding DB!")
  } catch(error) {
    console.error(error)
    throw error;
  }
}

async function testDB() {
  try {
    
    console.log("Starting to test database...")
    const users = await getAllUsers()
    // console.log("getAllUsers:", users)
    
    const players = await getAllPlayers()
    console.log("Players:", players)

    console.log("Finished testing database!")
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDB()
.then(testDB)
.catch(console.error)
.finally(() => {client.end()});