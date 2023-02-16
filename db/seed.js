// inside db/seed.js
const { client } = require('./client');
const { createUser, getAllUsers} = require('./index')

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
      "heightFeet" INTEGER,
      "heightInches" INTEGER,
      "weightPounds" INTEGER,
      team VARCHAR(255) NOT NULL
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

  console.log("Finished creating initial users")
  } catch(error){
    console.error(error)
    throw error
  }
}

async function rebuildDB() {
  try{
    client.connect();

    await dropTables()
    await createTables()
    await createInitialUsers()

    console.log("Finished Rebuilding DB!")
  } catch(error) {
    console.error(error)
    throw error;
  }
}

async function testDB() {
  try {
    // client.connect();
    
    console.log("Starting to test database...")
    const users = await getAllUsers()
    console.log("getAllUsers:", {users})
    
    // const { rows } = await client.query(`SELECT * FROM users;`);
    
    // console.log(rows);
  } catch (error) {
    console.error(error);
  } finally {
    // it's important to close out the client connection
    client.end();
  }
}

rebuildDB()
.then(testDB)
.catch(console.error)
.finally(() => {client.end()});