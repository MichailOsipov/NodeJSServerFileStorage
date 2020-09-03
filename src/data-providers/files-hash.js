const {map} = require('lodash');
const {queryMaker} = require('./utils');

const DB_USER = 'NodeJsServer';
const DB_PASSWORD = 123;
const DB_NAME = 'sharing_system';
const DB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@ds137054.mlab.com:37054/${DB_NAME}`;
const DB_COLLECTION = 'files-hash';
const doQuery = queryMaker({
    dbUrl: DB_URL,
    dbName: DB_NAME,
    dbCollection: DB_COLLECTION
});

module.exports.add = ({user, file}) => doQuery(async (collection) => {
    await collection.insertOne({user, file});
});

module.exports.getByQuery = query => doQuery(async (collection) => {
    const cursor = await collection.find(query);
    const docs = await cursor.toArray();
    return docs ? map(docs, doc => doc && doc.file) : [];
});
