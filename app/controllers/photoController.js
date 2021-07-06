const { request, response } = require('express');
const  Photo  = require ('../models/photo');

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
};

module.exports = photoController;