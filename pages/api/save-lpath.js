import { createFile } from '../../utils/file-system';

export default function handler(req, res) {
  const response = createFile(req.body);
  res.status(200).json(response);
}
