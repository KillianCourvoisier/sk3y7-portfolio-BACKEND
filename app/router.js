const { Router } = require('express');
const router = Router();

const  { photoController, albumController, localisationController, categoryController } = require ('./controllers/index');

router
        .get('/api/photo', photoController.getAllPhoto)
        .get('/api/photo/:id', photoController.getOnePhoto);

router
        .get('/api/album', albumController.getAllAlbum)
        .get('/api/album/:id', albumController.getOneAlbum);

router
        .get('/api/localisation', localisationController.getAllLocalisation)
        .get('/api/localisation/:id', localisationController.getOneLocalisation);

router
        .get('/api/category', categoryController.getAllCategory)
        .get('/api/category/:id', categoryController.getOneCategory);

router.use((request, response) => {
    response.status(404).json('No Such endpoint');
});

module.exports = router;
        