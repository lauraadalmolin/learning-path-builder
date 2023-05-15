const downloadFile = (document, fileData) => {
    var dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(fileData, null, 4))}`;
    var dlAnchorElem = document.getElementById('downloadAnchorElem');

    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `${fileData.name}.json`);
    dlAnchorElem.click();
}

export { downloadFile };