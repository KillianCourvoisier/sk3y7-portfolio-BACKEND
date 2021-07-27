const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => { 

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if(token == null) {
        return res.status(401).json('Connecte-toi pour les modifs ;)');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { 

        if(err) return res.status(403).json('Invalid token');
        req.user= user;
        
        next();
    });

}

module.exports = {
    authenticateToken
}