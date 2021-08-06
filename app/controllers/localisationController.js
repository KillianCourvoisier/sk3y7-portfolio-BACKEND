const { request, response } = require('express');
const  {Localisation}  = require ('../models/index');

const localisationController = {

    getAllLocalisation : async (request, response) => {
        const photos = await Localisation.findAllLocalisation();

        response.json(photos);
    },
    getOneLocalisation : async (request, response) =>  {

        try {
            const { id } = request.params;

            const localisationId = await Localisation.findOneLocalisation(id);

            response.json(localisationId);

        } catch (error) {
            response.status(404).json(error.message);
        }
    },
    postLocalisation : async (request, response) => {
        const data = request.body;

        try {
            const localisation = new Localisation(data);
            const result = await localisation.newLocalisation();
            response.json(result);
        } catch (error) {
            response.status(400).json(error.message);
        }
    },

    updateLocalisation : async (request, response) => {
        const {id} = request.params;
        const data = request.body;
        try{
            const localisation = new Localisation(data);
            const result = await localisation.updateLocalisation(id);
            response.json(result);
        }catch(error){
            response.status(400).json(error.message);
        }
    },

    deleteLocalisation : async (request, response) =>  {

        try {
            const { id } = request.params;

            const localisationId = await Localisation.deleteLocalisation(id);

            response.json(localisationId);

        } catch (error) {
            response.status(404).json(error.message);
        }
    },
};

module.exports = localisationController;