// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getFileNames, readFile } from '../../utils/file-system';

export default function handler(req, res) {
  const fileNames = getFileNames();
  const routes = [];

  fileNames.forEach((fileName) => {
    const fileData = readFile(fileName);
    const fileAsJSON = JSON.parse(fileData.toString());
    routes.push(fileAsJSON);
  });

  res.status(200).json({ routes })
}
