'use strict'

const models = require('../models');
const Pass = models.Pass;
const Attraction = models.Attraction;

class attractionsControllers{

    async addAttraction(name, date, games) {
        // for(let gameId of games) {
        //     const game = await GameController.gameWithId(gameId);
        //     if(game === undefined) {
        //         throw new Error('Missing game with id ' + gameId);
        //     }
        // }
        // const res = await database.connection.execute('INSERT INTO LAN (name, date) VALUES (?, ?)', [name, date]);
        // const lanId = res[0].insertId;
        // for(let gameId of games) {
        //     await database.connection.execute('INSERT INTO GameLAN (id_game, id_lan) VALUES (?, ?)', [gameId, lanId]);
        // }
    }

    //get attraction all
    //get attraction by id
    //get attraction by pass



}









module.exports = new attractionsControllers();