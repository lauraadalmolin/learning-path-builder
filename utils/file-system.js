import environment from '../constants/environment.json';

const fs = require('fs');
const path = require('path');

const getAllFileNames = () => {
  const jsonsInDir = fs
    .readdirSync(environment.storageDir)
    .filter((file) => path.extname(file) === '.json');

  return jsonsInDir;
};

const readFile = (fileName) => {
  const filePath = getFilePath(fileName);
  
  if (!fs.existsSync(filePath)) {
    return { success: false, error: { message: 'File does not exist' } };
  }

  try {
    const data = fs.readFileSync(filePath);
    return { success: true, data };
  } catch (e) {
    return { success: false, error: e };
  }
}

const createFile = (fileAsJSON) => {
  try {
    const fileId = fileAsJSON.id;
    const fileAsString = JSON.stringify(fileAsJSON, null, 2);
    console.log(fileAsString);
    const fileName = getFileName(fileId)
    const filePath = getFilePath(fileName);

    fs.writeFileSync(filePath, fileAsString);
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e };
  }
}

const getFilePath = (fileName) => {
  return path.join(environment.storageDir, fileName);
}

const getFileName = (fileId) => {
  return `${fileId}.json`;
};

const deleteFile = (fileId) => {
  const fileName = getFileName(fileId);
  const filePath = getFilePath(fileName);

  try {
    fs.unlinkSync(filePath);
    return { success: true };
  } catch(e) {
    return { success: false, error: e }
  }
}

export { createFile, deleteFile, getAllFileNames, getFileName, getFilePath, readFile };
