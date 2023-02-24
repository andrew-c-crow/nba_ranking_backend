const { client } = require('./client');

async function createPlayer(firstName, lastName, position, heightFeet, heightInches, weightPounds, team, imageUrl) {
    try {
        const {rows: [players]} = await client.query(`
        INSERT INTO players("firstName", "lastName", position, "heightFeet", "heightInches", "weightPounds", team, "imageURL")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `, 
        [firstName, lastName, position, heightFeet, heightInches, weightPounds, team, imageUrl])
        return players
    } catch (error) {
        console.error(error)
    }
}


async function getAllPlayers() {
    try{
        const {rows: players} = await client.query(`
        SELECT * FROM players;
        `)
        return players
    } catch (error){
        console.error(error)
    }
}

module.exports = {
    getAllPlayers,
    createPlayer
}