const {MongoClient} = require('mongodb');

const DB_USER = 'NodeJsServer';
const DB_PASSWORD = 123;
const DB_NAME = 'sharing_system';
const DB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@ds137054.mlab.com:37054/${DB_NAME}`;
const DB_COLLECTION = 'files';

module.exports.doQuery = async (query) => {
    const client = await MongoClient.connect(DB_URL);
    const db = client.db(DB_NAME);
    const res = await query(db.collection(DB_COLLECTION));
    client.close();
    return res;
};
