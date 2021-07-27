const { Router } = require('express');
const router = Router();

const  { 
        
        photoController,
        albumController,
        localisationController,
        categoryController,
        userController

} = require ('./controllers/index');

const {authenticateToken} = require('./middlewares/checkToken');

router
        .get('/api/photo', photoController.getAllPhoto)
        .get('/api/photo/:id', photoController.getOnePhoto)
        .post('/api/postphoto', authenticateToken, photoController.postPhoto);

router
        .get('/api/album', albumController.getAllAlbum)
        .get('/api/album/:id', albumController.getOneAlbum)
        .post('/api/postalbum', authenticateToken, albumController.postAlbum);


router
        .get('/api/localisation', localisationController.getAllLocalisation)
        .get('/api/localisation/:id', localisationController.getOneLocalisation)
        .post('/api/postlocalisation', authenticateToken, localisationController.postLocalisation);


router
        .get('/api/category', categoryController.getAllCategory)
        .get('/api/category/:id', categoryController.getOneCategory)
        .post('/api/postcategory', authenticateToken, categoryController.postCategory);


router
        .post('/api/login', userController.login);
        

router.use((request, response) => {
    response.status(404).json('No Such endpoint');
});

module.exports = router;
        