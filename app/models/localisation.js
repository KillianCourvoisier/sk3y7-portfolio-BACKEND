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

    async newLocalisation() {

        const insertQuery = {
            text: `
                INSERT INTO localisation (city, country)
                VALUES ($1, $2) RETURNING id;
            `,
            values: [this.city, this.country]
        }



        try {
            const { rows } = await db.query(insertQuery);
            if(rows[0]) {
                return (rows[0], 'Nouvelle localisation ajoutée !');
            } else {
                throw new Error('Localisation érronée, veuillez réessayer');
            }
        } catch (error) {
            switch (error.constraint) {
                case 'cities_are_unique':
                    throw new Error('Cet ville existe déjà, selectionne le tag existant ou enregistre une autre ville');
                    break;
                default:
                    throw new Error('Localisation érronée, veuillez réessayer');
                    break;
            }
        }
    }

    async updateLocalisation(id) {

        const updateQuery = {
            text: `
                UPDATE localisation SET
                city = $2,
                country= $3
                WHERE id = $1
                RETURNING id
            `,
            values: [id, this.city, this.country]
        }

        try {
            const { rows } = await db.query(updateQuery);
            if(rows[0]) {
                return 'La localisation a bien été mise à jour';
            } 
            
        } catch (error) {
            throw new Error('Mise à jour invalidée, veuillez réessayer');
        }
    
    }

    static async deleteLocalisation(id) {
        const deleteQuery = {
            text: 'DELETE FROM localisation WHERE id = $1 RETURNING id;',
            values: [id]
        }

        
        try {
            const {rows} = await db.query(deleteQuery);

            if(rows[0]) {
                return 'Votre localisation a bien été supprimée';
            }
         
        } catch (error) {
            throw new Error(error.message);
        }
    }

}



module.exports = Localisation;