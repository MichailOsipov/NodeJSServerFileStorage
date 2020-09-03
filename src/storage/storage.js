const fs = require('fs');
const Promise = require('bluebird');

const mkdir = Promise.promisify(fs.mkdir);
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

const STORE_LOCATION = 'store';

const tryInitializeStore = async () => {
    try {
        await mkdir(`${STORE_LOCATION}`);
    } catch (err) {
        // do nothing
    }
};

module.exports.addFileToStorage = async (file, filename, sessionId) => {
    await tryInitializeStore();
    try {
        await mkdir(`${STORE_LOCATION}/${sessionId}`);
    } catch (err) {
        throw Error('cannot create session folder');
    }

    try {
        writeFile(`${STORE_LOCATION}/${sessionId}/${filename}`, file.buffer);
    } catch (err) {
        throw Error('cannot write file');
    }
    // return filename-descriptors
};

module.exports.getFileFromStorage = async (filename, sessionId) => {
    try {
        return await readFile(`${STORE_LOCATION}/${sessionId}/${filename}`);
    } catch (err) {
        throw Error('cannot read file');
    }
};
