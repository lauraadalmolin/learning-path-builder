import environment from '../constants/environment.json';

const fs = require('fs');
const path = require('path');

const getFileNames = () => {
  const jsonsInDir = fs
    .readdirSync(environment.storageDir)
    .filter((file) => path.extname(file) === '.json');

  return jsonsInDir;
};

const readFile = (fileName) => {
  return fs.readFileSync(path.join(environment.storageDir, fileName));
}

const createFile = (fileAsJSON) => {
  try {
    const fileId = fileAsJSON.id;
    const fileAsString = JSON.stringify(fileAsJSON, null, 2);
    const filePath = path.join(environment.storageDir, `${fileId}.json`);

    fs.writeFileSync(filePath, fileAsString);
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e };
  }
}

export { getFileNames, readFile, createFile };
