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
                    JOIN album_has_photo ON album_has_photo.album_id = album.id
                    JOIN album_has_category ON album_has_category.album_id = album.id
                    JOIN category ON category.id = album_has_category.category_id
                    WHERE album.id = $1
                    GROUP BY album.id
                
            `,
            values: [id]
        }
        const { rows } = await db.query(query);

        if(rows[0]) {
            const album = {
            }
            return new Album(rows[0]); 
        } else {
            throw new Error('No such endpoint');
        }
    }

}

module.exports = Album;