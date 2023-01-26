import { getAllFileNames, readFile } from '../../utils/file-system';

export default function handler(req, res) {
  const fileNames = getAllFileNames();
  const routes = [];

  fileNames.forEach((fileName) => {
    const response = readFile(fileName);
    if (response.success) {
      const fileAsJSON = JSON.parse(response.data.toString());
      routes.push(fileAsJSON);
    }
  });

  res.status(200).json({ routes })
}
