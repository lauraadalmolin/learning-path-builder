import { getAllFileNames, readFile } from '../../utils/file-system';

const getTotalAmountOfElements = (lPathData) => {
  return `${lPathData.graph?.nodes?.length ?? 0} conteúdos`;
}

const getTotalAmountOfTransitions = (lPathData) => {
  return `${lPathData.graph?.edges?.length ?? 0} transições`;
}

const getFocusString = (lPathData) => {
  return `Foco simultâneo máximo: ${lPathData.focus ?? "não definido"}`;
}

export default function handler(req, res) {
  const fileNames = getAllFileNames();
  const summaries = [];

  fileNames.forEach((fileName) => {
    const response = readFile(fileName);
    if (response.success) {
      const lPathData = JSON.parse(response.data.toString());
      
      const summary = { 
        name: lPathData.name,
        id: lPathData.id,
        focus: getFocusString(lPathData),
        numberOfElements: getTotalAmountOfElements(lPathData),
        numberOfTransitions: getTotalAmountOfTransitions(lPathData)
      };

      summaries.push(summary);
    }
  });

  res.status(200).json({ data: summaries });
}
