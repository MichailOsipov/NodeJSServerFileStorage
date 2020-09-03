const {MongoClient} = require('mongodb');

module.exports.queryMaker = ({dbUrl, dbName, dbCollection}) => async (query) => {
    let client;
    let res;
    try {
        client = await MongoClient.connect(dbUrl);
    } catch (err) {
        console.log(err);
        throw Error('cannot connect to DB');
    }

    try {
        const db = client.db(dbName);
        res = await query(db.collection(dbCollection));
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return res;
};
