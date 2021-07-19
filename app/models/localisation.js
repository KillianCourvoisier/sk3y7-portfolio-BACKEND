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
            SELECT localisation.*,
json_agg(album.id) as album_id, 
json_agg(photo.id) as photo_id
FROM localisation
LEFT OUTER JOIN album ON album.localisation_id = localisation.id 
LEFT OUTER JOIN photo ON photo.localisation_id = localisation.id 
WHERE localisation.id = $1
GROUP BY localisation.id
                
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