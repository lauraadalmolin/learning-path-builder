import { getFileName, readFile } from '../../utils/file-system';

export default function handler(req, res) {
  const { learningPathId } = req.query;

  const fileName = getFileName(learningPathId);
  const response = readFile(fileName);

  if (response.success) {
    response.data = JSON.parse(response.data.toString());
  }

  res.status(200).json(response);
}
