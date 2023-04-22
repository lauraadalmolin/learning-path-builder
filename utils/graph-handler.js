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
            title: elementData.name,
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

export { createFocusNode, createElementNode };