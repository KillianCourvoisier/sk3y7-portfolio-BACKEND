const {User} = require('../models/index');
const jwt = require('jsonwebtoken');

const userController = {

    login : async (request, response) =>  {

        const data = request.body;
        
        try {

            const user = await User.checkIfSk3y7(data);
            const userPlainObject = {
                id: user.id,
                username: user.username,
                email: user.email
            }
    
            const accessToken = jwt.sign(userPlainObject, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
            response.json({accessToken: accessToken, id: user.id, username: user.username})

        } catch (error) {
            response.status(400).json(error.message)
        }
        
    },

}

module.exports = userController;