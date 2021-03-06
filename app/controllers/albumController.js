const { request, response } = require('express');
const  {Album}  = require ('../models/index');

const albumController = {

    getAllAlbum : async (request, response) => {
        const albums = await Album.findAllAlbum();
        // console.log(albums)

        response.json(albums);
    },
    
    getOneAlbum : async (request, response) =>  {

        try {
            const { id } = request.params;

            const albumId = await Album.findOneAlbum(id);

            response.json(albumId);

        } catch (error) {
            response.status(404).json(error.message);
        }
    },

    postAlbum : async (request, response) => {
        const data = request.body;

        try {
            const album = new Album(data);
            const result = await album.newAlbum();
            response.json(result);
        } catch (error) {
            response.status(400).json(error.message);
        }
    },

    updateAlbum : async (request, response) => {
        const {id} = request.params;
        const data = request.body;
        try{
            const album = new Album(data);
            const result = await album.updateAlbum(id);
            response.json(result);
        }catch(error){
            response.status(400).json(error.message);
        }
    },

    deleteAlbum : async (request, response) =>  {

        try {
            const { id } = request.params;

            const albumId = await Album.deleteAlbum(id);

            response.json(albumId);

        } catch (error) {
            response.status(404).json(error.message);
        }
    },
};

module.exports = albumController;