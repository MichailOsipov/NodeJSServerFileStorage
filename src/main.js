require('./server').startServer();

// const {map} = require('lodash');
// const express = require('express');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const {MongoClient} = require('mongodb');
//
// const upload = multer();
//
// const hostname = '127.0.0.1';
// const port = 8088;
//
// const DB_USER = 'NodeJsServer';
// const DB_PASSWORD = 123;
// const DB_NAME = 'sharing_system';
// const DB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@ds137054.mlab.com:37054/${DB_NAME}`;
// const FILES_DATABASE = 'files';
//
// const app = express();
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use((err, request, response, next) => {
//     console.log(err);
//     response.status(500).send('Something broke!');
//     next();
// });
//
// app.get('/init', (request, response) => {
//     response.json({message: 'Hello, You are on NodeJsServer'});
// });
//
// app.post('/add-file', upload.array(), (request, response) => {
//     const {body} = request;
//
//     response.json({message: 'I got file'});
//     MongoClient.connect(DB_URL, (err, client) => {
//         if (err) throw err;
//         const db = client.db(DB_NAME);
//         db.collection(FILES_DATABASE).insertOne(body, (insErr) => {
//             if (insErr) throw err;
//             client.close();
//         });
//     });
// });
//
// app.get('/get-file', (request, response) => {
//     const {user} = request.query;
//     MongoClient.connect(DB_URL, (err, client) => {
//         if (err) throw err;
//         const db = client.db(DB_NAME);
//         const query = {user};
//         db.collection(FILES_DATABASE).find(query, (findError, cursor) => {
//             cursor.toArray((error, docs) => {
//                 client.close();
//                 const entitiesToSend = docs ? map(docs, doc => doc && doc.file) : [];
//                 response.json(entitiesToSend);
//             });
//         });
//     });
// });
//
// app.get('*', (request, response) => {
//     response.json({message: 'I dont know that page'});
// });
//
// app.listen(port, hostname, (err) => {
//     if (err) {
//         return console.log('something bad happened', err);
//     }
//     return console.log(`Server running at http://${hostname}:${port}/`);
// });
