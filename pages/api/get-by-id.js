import { getFileName, readFile } from '../../utils/file-system';

export default function handler(req, res) {
  const { learningPathId } = req.query;

  const fileName = getFileName(learningPathId);
  const fileData = readFile(fileName);
  const fileAsJSON = JSON.parse(fileData.toString());

  res.status(200).json(fileAsJSON);
}
