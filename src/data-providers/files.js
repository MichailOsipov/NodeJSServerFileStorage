const {map} = require('lodash');
const {doQuery} = require('./utils');

module.exports.add = ({user, file}) => doQuery(async (collection) => {
    await collection.insertOne({user, file});
});

module.exports.getByQuery = ({user}) => doQuery(async (collection) => {
    const cursor = await collection.find({user});
    const docs = await cursor.toArray();
    return docs ? map(docs, doc => doc && doc.file) : [];
});
