const db = require ('../database');
const hashService = require('../services/passwordHash');

class User {
    id;
    username;
    email;
    password;

    constructor(data){

        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async checkIfSk3y7(data) {

        const query = {
            text:
                `
                    SELECT "user".id, username, email, password FROM "user" 
                    WHERE "user".email = $1
                `,
            values: [data.email]
        }

        const { rows } = await db.query(query);

        if(!rows[0]) {
            throw new Error('Faussaire !')
        }

        
        const match = await hashService.comparePassword(data.password, rows[0].password);
        
        if(match) {
            console.log('Connection successful');
            return new User({
                id: rows[0].id,
                username: rows[0].username
            })
        } else {
            throw new Error('Faussaire !')
        }
            
    }

}

module.exports = User;