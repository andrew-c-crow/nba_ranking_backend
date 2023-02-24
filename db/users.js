const {client}  = require('./client');
const bcrypt = require("bcrypt")

async function getAllUsers() {
    try {
        const {rows}  = await client.query(
            `SELECT id, username, password, "firstName", "lastName" FROM users;`);
            return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function createUser({username, password, firstName, lastName}) {
const SALT_COUNT = 12
const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    try{
        const{ rows: [user] } = await client.query(`
        INSERT INTO users(username, password, "firstName", "lastName")
        VALUES($1, $2, $3, $4)

        RETURNING *;
        `,
        [username, hashedPassword, firstName, lastName]
        );
        delete user.password;
        return user;
    } catch(error) {
        console.error(error);
        throw error;
    }
}   
module.exports = {
    getAllUsers,
    createUser
}