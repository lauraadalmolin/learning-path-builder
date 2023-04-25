import uuid from 'react-uuid';

const createFocusNode = (focus) => {
    return {
        data: {
            id: uuid(),
            title: "Foco: " + focus,
        },
        position: {
            x: 100,
            y: 100
        },
    };
}

const createElementNode = (elementData, parentId) => {
    return {
        data: {
            id: uuid(),
            title: elementData.title,
            description: elementData.description,
            link: elementData.link,
            parent: parentId, 
            focus: elementData.focus
        },
        position: {
            x: 100,
            y: 100
        },
    };
}

const updateFocusNode = (focusNode, elementData) => {
    focusNode.data().title = "Foco: " + elementData.focus;
};

const updateElementNode = (elementNode, elementData) => {
    console.log(elementData);
    for (const [key, value] of Object.entries(elementData)) {
        elementNode.data()[key] = value;
        console.log(key, value)
    }

};

export { createFocusNode, createElementNode, updateFocusNode, updateElementNode };