const {
    
    photoSchema,
    localisationSchema,
    categorySchema,
    albumSchema

} = require ('../schemas/index');

const validatePhoto = (request, response, next) => {

    const photoResult = photoSchema.validate(request.body);

    if (photoResult.error) {
        response.status(400).json(photoResult.error.message);
    }else{
        next();
    }

}

const validateLocalisation = (request, response, next) => {

    const localisationResult = localisationSchema.validate(request.body);

    if (localisationResult.error) {
        response.status(400).json(localisationResult.error.message);
    }else{
        next();
    }

}

const validateCategory = (request, response, next) => {

    const categoryResult = categorySchema.validate(request.body);

    if (categoryResult.error) {
        response.status(400).json(categoryResult.error.message);
    }else{
        next();
    }

}

const validateAlbum = (request, response, next) => {

    const albumResult = albumSchema.validate(request.body);

    if (albumResult.error) {
        response.status(400).json(albumResult.error.message);
    }else{
        next();
    }

}

module.exports = {
    validatePhoto,
    validateLocalisation,
    validateCategory,
    validateAlbum,
}