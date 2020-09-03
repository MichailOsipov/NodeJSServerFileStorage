const {map} = require('lodash');
const multer = require('multer');
const Guid = require('guid');
const {adjustStorageDatabaseData} = require('../utils/storage-database-data');

const upload = multer();

module.exports.resource = (expressApp, storage, dataProvider, name) => {
    expressApp.get(`/${name}`, async ({query}, response, next) => {
        const sessionId = query.hash;
        const dbData = await dataProvider.find({sessionId});
        const {files} = dbData[0];
        try {
            const data = await Promise.all(map(files, async ({realName, saveName}) => {
                const fileBytes = await storage.getFileFromStorage(saveName, sessionId);
                return {name: realName, data: fileBytes};
            }));
            response.json(data);
        } catch (err) {
            next(err);
        }
    });

    expressApp.post(`/${name}`, upload.array('files'), async (data, response, next) => {
        const sessionId = (Guid.create()).value;
        response.json({hash: sessionId});
        const {storageData, dbData} = adjustStorageDatabaseData(data.files);

        try {
            await storage.addFilesToStorage(storageData, sessionId);
        } catch (err) {
            next(err);
        }
        try {
            await dataProvider.insert({
                sessionId,
                files: dbData
            });
        } catch (err) {
            next(err);
        }
    });
};
