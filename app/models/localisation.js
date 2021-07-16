const db = require ('../database');

class Localisation {
    id;
    city;
    country;

    constructor(data){

        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findAllLocalisation(){
        const {rows} = await db.query('SELECT * FROM "localisation";');
        
        return rows.map(localisation => new Localisation(localisation));
    }

    static async findOneLocalisation(id) {
        const query = {
            text: 
            `
            SELECT * FROM localisation 
            WHERE "id" = $1
                
            `,
            values: [id]
        }
        const { rows } = await db.query(query);

        if(rows[0]) {
            const localisation = {
            }
            return new Localisation(rows[0]); 
        } else {
            throw new Error('No such endpoint');
        }
    }

}

module.exports = Localisation;