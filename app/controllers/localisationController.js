const { request, response } = require('express');
const  Localisation  = require ('../models/localisation');

const localisationController = {

    getAllLocalisation : async (request, response) => {
        const photos = await Localisation.findAllLocalisation();
        // console.log(photos)

        response.json(photos);
    },
    getOneLocalisation : async (request, response) =>  {

        try {
            const { id } = request.params;

            const photoId = await Localisation.findOneLocalisation(id);

            response.json(photoId);

        } catch (error) {
            response.status(404).json(error.message);
        }
    },
};

module.exports = localisationController;