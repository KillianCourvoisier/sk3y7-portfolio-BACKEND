// const { Pool } = require('pg');
// // ici , les infos de connection sont récupérées dans l'environnement// PGHOST pour l'hôte// PGUSER pour l'utilisateur// PGPASSWORD pour le mot de passe//PGDATABASE pour la base de donnéeslet db;
// if(process.env.ENVIRONNEMENT === 'developpement') {
//         db = new Pool();
//     } else if (process.env.ENVIRONNEMENT === 'production') {
//             db = new Pool({
//                 user: process.env.PGUSERNAME,
//                 host: process.env.PGHOSTNAME,
//                 database: process.env.PGDATABASE,
//                 password: process.env.PGPASSWORD,
//                 port: process.env.PGPORT,
//             })
//     }

const {Client} = require('pg');

// const db = new Client({
//     user : process.env.PGUSERNAME,
//     host : process.env.PGHOST,
//     database : process.env.PGDATABASE,
//     password : process.env.PGPASSWORD,
//     port : process.env.PGPORT,
// });
const db = new Client(process.env.PG_URL);

db.connect();

module.exports = db;