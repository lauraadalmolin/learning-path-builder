import { getAllFileNames, readFile } from '../../utils/file-system';

export default function handler(req, res) {
  const fileNames = getAllFileNames();
  const routes = [];

  fileNames.forEach((fileName) => {
    const fileData = readFile(fileName);
    const fileAsJSON = JSON.parse(fileData.toString());
    routes.push(fileAsJSON);
  });

  res.status(200).json({ routes })
}
