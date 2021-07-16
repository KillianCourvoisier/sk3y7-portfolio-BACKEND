const { request, response } = require('express');
const  Album  = require ('../models/album');

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
};

module.exports = albumController;