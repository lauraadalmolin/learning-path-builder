import { deleteFile } from '../../utils/file-system';

export default function handler(req, res) {
  const { learningPathId } = req.query;

  const response = deleteFile(learningPathId);

  res.status(200).json(response);
}
