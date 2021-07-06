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
            // text: 
            // `
            //     SELECT 
            //         photo.*, category.*, localisation.*, album.*
            //     FROM photo
            //     JOIN album_has_photo ON album_has_photo.photo_id = $1
            //     JOIN category ON photo_has_category.category_id = category.id
            //     JOIN localisation ON photo.localisation_id = localisation.id
            // `,
            text: 
            `
            SELECT photo.*, localisation.*, album_has_photo.album_id
            FROM photo
            JOIN album_has_photo ON album_has_photo.album_id = photo.album_id
            JOIN localisation ON photo.localisation_id = localisation.id
            WHERE photo.id=$1
                
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

}

module.exports = Photo;