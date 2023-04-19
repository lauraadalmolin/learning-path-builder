export default {
  save: async (lPathObj, graphData) => {
    lPathObj.graph = graphData;
    const response = await fetch('/api/save-lpath', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lPathObj),
    });

    return await response.json();
  },
  getById: async (learningPathId) => {
    const response = await fetch(`/api/get-by-id?learningPathId=${learningPathId}`);
    return await response.json();
  },
  getAll: async () => {
    const response = await fetch(`/api/get-all`);
    return await response.json();
  },
  getSummaries: async () => {
    const response = await fetch(`/api/get-summaries`);
    return await response.json();
  },
  delete: async (learningPathId) => {
    const response = await fetch(`/api/delete?learningPathId=${learningPathId}`);
    return await response.json();
  }
}