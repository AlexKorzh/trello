const fs = require('fs');

const createUploadFolder = (...params) => {
    let folderPath = 'files/';

    const makeFolderPath = path => folderPath += `${path}/`;

    for (let i = 0; i < params.length; i++) {
        makeFolderPath(params[i]);

        if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
    }

    return folderPath;
};

module.exports = createUploadFolder;