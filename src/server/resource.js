const multer = require('multer');

const upload = multer();

module.exports.resource = (expressApp, dataProvider, name) => {
    expressApp.get(`/${name}`, async ({query}, response) => {
        const data = await dataProvider.getByQuery(query);
        response.json(data);
    });

    expressApp.post(`/${name}`, upload.array(), async ({body}, response) => {
        await dataProvider.add(body);
        response.sendStatus(200);
    });
};
