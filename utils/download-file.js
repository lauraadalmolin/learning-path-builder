const downloadFile = (document, fileData) => {
    var dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(fileData, null, 4))}`;
    var dlAnchorElem = document.getElementById('downloadAnchorElem');

    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `${fileData.name}.json`);
    dlAnchorElem.click();
}

const downloadImageFile = (document, fileData, fileName) => {
    var dataStr = `data:img/png;base64,${fileData}`;
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    console.log(fileData)

    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `${fileName}.png`);
    dlAnchorElem.click();
}

export { downloadFile, downloadImageFile };