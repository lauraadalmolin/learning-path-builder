import { getAllFileNames, readFile } from '../../utils/file-system';

export default function handler(req, res) {
  const fileNames = getAllFileNames();
  const summaries = [];

  fileNames.forEach((fileName) => {
    const response = readFile(fileName);
    if (response.success) {
      const lPathData = JSON.parse(response.data.toString());

      // falta adicionar o n° de conteúdos e o nº de foco
      const summary = { name: lPathData.name, id: lPathData.id };
      summaries.push(summary);
    }
  });

  res.status(200).json({ data: summaries });
}
