const db = require ('../database');

class Photo {
    id;
    name;
    imageUrl;
    createdAt;
    shotDate;
    cameraBrand;
    cameraModel;
    exposureTime;
    exposureProgram;
    apertureValue;
    focalLenght;
    shutterSpeed;
    isoValue;
    softwareUsed;
    localisationId;
    albumId;

    set image_url(val){
        this.imageUrl = val;
    }
    set created_at(val){
        this.createdAt = val;
    }
    set shot_date(val){
        this.shotDate = val;
    }
    set camera_brand(val){
        this.cameraBrand = val;
    }
    set camera_model(val){
        this.cameraModel = val;
    }
    set exposure_time(val){
        this.exposureTime = val;
    }
    set exposure_program(val){
        this.exposureProgram = val;
    }
    set aperture_value(val){
        this.apertureValue = val;
    }
    set focal_lenght(val){
        this.focalLenght = val;
    }
    set shutter_speed(val){
        this.shutterSpeed = val;
    }
    set iso_value(val){
        this.isoValue = val;
    }
    set software_used(val){
        this.softwareUsed = val;
    }
    set localisation_id(val){
        this.localisationId = val;
    }
    set album_id(val){
        this.albumId = val;
    }

    constructor(data){

        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findAllPhoto(){
        const {rows} = await db.query('SELECT * FROM "photo";');
        
        return rows.map(photo => new Photo(photo));
    }

    static async findOnePhoto(id) {
        const query = {
            
            text: 
            `
            SELECT photo.*,
            json_agg (DISTINCT (CONCAT (localisation.city,' - ', localisation.country))) as localisation,
            json_agg (DISTINCT (album.title)) as album_title,
            json_agg (DISTINCT (category.label)) as category
            FROM photo
			JOIN album ON album.id = photo.album_id
            LEFT OUTER JOIN localisation ON photo.localisation_id = localisation.id
			LEFT OUTER JOIN photo_has_category ON photo_has_category.photo_id = photo.id
			LEFT OUTER JOIN category ON category.id = photo_has_category.category_id
            WHERE photo.id= $1
			GROUP BY photo.id
                
            `,
            values: [id]
        }
        const { rows } = await db.query(query);

        if(rows[0]) {
            const photo = {
            }
            return new Photo(rows[0]); 
        } else {
            throw new Error('No such endpoint');
        }
    }

    static async newPhoto(thePhoto){
        let insertQuery;
    
        const photoData = [
            thePhoto.name,
            thePhoto.imageUrl,
            thePhoto.createdAt,
            thePhoto.shotDate,
            thePhoto.cameraBrand,
            thePhoto.cameraModel,
            thePhoto.exposureTime,
            thePhoto.exposureProgram,
            thePhoto.apertureValue,
            thePhoto.focalLenght,
            thePhoto.shutterSpeed,
            thePhoto.isoValue,
            thePhoto.softwareUsed,
            thePhoto.localisationId,
            thePhoto.albumId
        ];
        const categoryData = [];
        
        thePhoto.categories.forEach(async (theCategory) => {
            const selectCategoryQuery = {
                text: `SELECT id FROM category WHERE label = $1`,
                values: [theCategory.label]
            }
            const { rows } = await db.query(selectCategoryQuery);
            categoryData.push(rows[0].id);
        })

        if (thePhoto.userId){
            insertQuery = `
            INSERT INTO photo (name, image_url, created_at, shot_date, camera_brand, camera_model, exposure_time, exposure_program, aperture_value, focal_lenght, shutter_speed, iso_value, software_used, localisation_id, album_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id;
            `;
            
        }
        
        try {
            const {rows} = await db.query(insertQuery, photoData);
            for (let i=0; i < categoryData.length; i++) {
                const query2 = {
                    text: `
                        INSERT INTO photo_has_category (photo_id, category_id) VALUES ($1, $2)
                    `,
                    values: [rows[0].id, categoryData[i]]
                }
                await db.query(query2);
            }
            return 'La nouvelle photo à bien été mise en ligne.'
        } catch (error) {
            throw new Error(
                'La nouvelle photo n\'a pas été enregistrée')
        }
    
    }
}

module.exports = Photo;