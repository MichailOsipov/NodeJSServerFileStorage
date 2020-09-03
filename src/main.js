const {map} = require('lodash');
const http = require('http');
const {MongoClient} = require('mongodb');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8088;

const DB_USER = 'NodeJsServer';
const DB_PASSWORD = 123;
const DB_NAME = 'sharing_system';
const DB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@ds137054.mlab.com:37054/${DB_NAME}`;

const FILES_DATABASE = 'files';

const server = http.createServer((req, res) => {
    const urlParsed = url.parse(req.url, true);

    res.writeHead(200, {'Content-Type': 'application/json'});
    if (urlParsed.pathname === '/hello') {
        const json = JSON.stringify({message: 'Hello, You are on NodeJsServer'});
        res.end(json);
    } else if (urlParsed.pathname === '/add-file') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            body = Buffer.concat(body).toString();
            const entity = JSON.parse(body);
            res.end('I got a file!');

            MongoClient.connect(DB_URL, (err, client) => {
                if (err) throw err;
                const db = client.db(DB_NAME);
                db.collection(FILES_DATABASE).insertOne(entity, (insErr) => {
                    if (insErr) throw err;
                    client.close();
                });
            });
        });
    } else if (urlParsed.pathname === '/get-file') {
        const {user} = urlParsed.query;
        MongoClient.connect(DB_URL, (err, client) => {
            if (err) throw err;
            const db = client.db(DB_NAME);
            const query = {user};
            db.collection(FILES_DATABASE).find(query, (findError, cursor) => {
                cursor.toArray((error, docs) => {
                    client.close();
                    const entitiesToSend = docs ? map(docs, doc => doc && doc.file) : [];
                    res.end(JSON.stringify(entitiesToSend));
                });
            });
        });
    } else {
        const json = JSON.stringify({message: 'I dont know that page'});
        res.end(json);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
