const multer = require('multer');

const upload = multer();

module.exports.resource = (expressApp, dataProvider, name) => {
    expressApp.get(`/${name}`, async ({query}, response, next) => {
        try {
            const data = await dataProvider.getByQuery(query);
            response.json(data);
        } catch (err) {
            next(err);
        }
    });

    expressApp.post(`/${name}`, upload.array(), async ({body}, response, next) => {
        try {
            await dataProvider.add(body);
            response.sendStatus(200);
        } catch (err) {
            next(err);
        }
    });
};
