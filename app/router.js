const { Router } = require('express');
const router = Router();

const  photoController = require ('./controllers/photoController.js')

router
        .get('/api/photo', photoController.getAllPhoto)
        .get('/api/photo/:id', photoController.getOnePhoto);

router.use((request, response) => {
    response.status(404).json('No Such endpoint');
});

module.exports = router;
        