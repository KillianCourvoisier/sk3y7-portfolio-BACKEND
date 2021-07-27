const { request, response } = require('express');
const  {Photo}  = require ('../models/index');

const photoController = {

    getAllPhoto : async (request, response) => {
        const photos = await Photo.findAllPhoto();
        // console.log(photos)

        response.json(photos);
    },

    getOnePhoto : async (request, response) =>  {

        try {
            const { id } = request.params;

            const photoId = await Photo.findOnePhoto(id);

            response.json(photoId);

        } catch (error) {
            response.status(404).json(error.message);
        }
    },

    postPhoto : async (request, response) => {
    
        const thePhoto = new Photo(request.body);
        thePhoto.userId = request.user.id;
        console.log(thePhoto);
    
        try {
            
            const result = await Photo.newPhoto(thePhoto);
    
            response.json(result);
        } catch (err) {
            response.status(403).json(err.message);
        }
    },
};

module.exports = photoController;