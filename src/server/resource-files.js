const multer = require('multer');
const Guid = require('guid');
const {storage} = require('../storage');

const upload = multer();

module.exports.resource = (expressApp, dataProvider, name) => {
    expressApp.get(`/${name}`, async ({query}, response, next) => {
        const sessionId = query.hash;
        try {
            const data = await storage.getFileFromStorage('1.jpg', sessionId);
            response.json({name: 'cat.jpg', data});
        } catch (err) {
            next(err);
        }
    });

    expressApp.post(`/${name}`, upload.array('files'), async (data, response, next) => {
        const sessionId = (Guid.create()).value;
        const file = data.files[0];
        response.json({hash: sessionId});
        try {
            await storage.addFileToStorage(file, '1.jpg', sessionId);
        } catch (err) {
            next(err);
        }
    });
};
