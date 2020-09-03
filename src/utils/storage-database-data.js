const {map} = require('lodash');
const {get} = require('lodash/fp');

module.exports.adjustStorageDatabaseData = (files) => {
    const filesData = map(files, ({originalname, ...rest}, i) => ({
        dbData: {
            realName: originalname,
            saveName: i
        },
        storageData: {
            saveName: i,
            file: {...rest}
        }
    }));
    return {
        dbData: map(filesData, get('dbData')),
        storageData: map(filesData, get('storageData'))
    };
};
