const db = require ('../database');

class Album {
    id;
    title;
    updatedAt;
    createdAt;
    localisationId;

    set updated_at(val){
        this.updatedAt = val;
    }
    set created_at(val){
        this.createdAt = val;
    }
    set localisation_id(val){
        this.localisationId = val;
    }

    constructor(data){

        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findAllAlbum(){
        const {rows} = await db.query('SELECT * FROM "album";');
        
        return rows.map(album => new Album(album));
    }

    static async findOneAlbum(id) {
        const query = {
            text: 
            `
            SELECT
            album.*,
            json_agg (DISTINCT (CONCAT (localisation.city,' - ', localisation.country))) as localisation,
            json_agg (DISTINCT (album_has_photo.photo_id)) as photo_id,
            json_agg (DISTINCT (category.label)) as category
                FROM album
                    LEFT OUTER JOIN localisation ON album.localisation_id = localisation.id
                    LEFT OUTER JOIN album_has_photo ON album_has_photo.album_id = album.id
                    LEFT OUTER JOIN album_has_category ON album_has_category.album_id = album.id
                    LEFT OUTER JOIN category ON category.id = album_has_category.category_id
                    WHERE album.id = $1
                    GROUP BY album.id
                
            `,
            values: [id]
        }
        const { rows } = await db.query(query);

        console.log(rows[0]);

        if(rows[0]) {
            const album = {
            }
            return new Album(rows[0]); 
        } else {
            throw new Error('No such endpoint');
        }
    }

    async newAlbum() {

        const insertQuery = {
            text: `
                INSERT INTO album (title, created_at, updated_at, localisation_id)
                VALUES ($1, $2, $3, $4) RETURNING album.id;
            `,
            values: [this.title, this.createdAt, this.updatedAt, this.localisationId]
        }



        try {
            const { rows } = await db.query(insertQuery);
            console.log(rows[0]);
            if(rows[0]) {
                return (rows[0], 'Nouvel album créé !');
            } else {
                throw new Error('Album érronée, veuillez réessayer 1 ');
            }
        } catch (error) {
            console.trace(error);
            switch (error.constraint) {
                case 'album_title_key':
                    throw new Error('Ce titre d\'album existe déjà, assigne la/les photo(s) au tag existant ou trouve un autre titre !');
                    break;
                case 'album_localisation_id_fkey':
                    throw new Error('Cet Localisation n\'existe pas, crée-la avant de l\'assigné');
                    break;
                default:
                    throw new Error('Album érronée, veuillez réessayer 2');
                    break;
            }
        }
    }

    async updateAlbum(id) {

        const updateQuery = {
            text: `
                UPDATE album SET
                title = $2,
                created_at = $3,
                updated_at = $4,
                localisation_id = $5
                WHERE id = $1
                RETURNING id
            `,
            values: [id, this.title, this.createdAt, this.updatedAt, this.localisationId]
        }

        try {
            const { rows } = await db.query(updateQuery);
            if(rows[0]) {
                return 'L\'album a bien été mis à jour';
            }
            
        } catch (error) {
            console.trace(error);
            throw new Error('Mise à jour invalidée, veuillez réessayer');
        }
    
    }

    static async deleteAlbum(id) {
        const deleteQuery = {
            text: 'DELETE FROM album WHERE id = $1 RETURNING id;',
            values: [id]
        }

        
        try {
            const {rows} = await db.query(deleteQuery);

            if(rows[0]) {
                return 'Votre album a bien été supprimée';
            }
         
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = Album;