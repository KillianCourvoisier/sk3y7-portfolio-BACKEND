const { Router } = require('express');
const router = Router();

const  { 
        
        photoController,
        albumController,
        localisationController,
        categoryController,
        userController

} = require ('./controllers/index');

const validatorService = require ('./services/validator');

const {authenticateToken} = require('./middlewares/checkToken');

router
        .get('/api/photo', photoController.getAllPhoto)
        .get('/api/photo/:id', photoController.getOnePhoto)
        .post('/api/postphoto', authenticateToken, validatorService.validatePhoto, photoController.postPhoto)
        .patch('/api/photo/:id', authenticateToken, validatorService.validatePhoto, photoController.updatePhoto)
        .delete('/api/photo/:id', authenticateToken, photoController.deletePhoto);

router
        .get('/api/album', albumController.getAllAlbum)
        .get('/api/album/:id', albumController.getOneAlbum)
        .post('/api/postalbum', authenticateToken, validatorService.validateAlbum, albumController.postAlbum)
        .patch('/api/album/:id', authenticateToken, validatorService.validateAlbum, albumController.updateAlbum)
        .delete('/api/album/:id', authenticateToken, albumController.deleteAlbum);


router
        .get('/api/localisation', localisationController.getAllLocalisation)
        .get('/api/localisation/:id', localisationController.getOneLocalisation)
        .post('/api/postlocalisation', authenticateToken, validatorService.validateLocalisation, localisationController.postLocalisation)
        .patch('/api/localisation/:id', authenticateToken, validatorService.validateLocalisation, localisationController.updateLocalisation)
        .delete('/api/localisation/:id', authenticateToken, localisationController.deleteLocalisation);

router
        .get('/api/category', categoryController.getAllCategory)
        .get('/api/category/:id', categoryController.getOneCategory)
        .post('/api/postcategory', authenticateToken, validatorService.validateCategory, categoryController.postCategory)
        .patch('/api/category/:id', authenticateToken, validatorService.validateCategory, categoryController.updateCategory)
        .delete('/api/category/:id', authenticateToken, categoryController.deleteCategory);


router
        .post('/api/login', userController.login);
        

router.use((request, response) => {
    response.status(404).json('No Such endpoint');
});

module.exports = router;
        