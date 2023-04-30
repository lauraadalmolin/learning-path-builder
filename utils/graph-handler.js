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
    for (const [key, value] of Object.entries(elementData)) {
        elementNode.data()[key] = value;
    }
};

const createTransitionEdge = (transitionData, destination) => {
    return {
        data: {
            id: uuid(),
            source: transitionData.originElement.parent,
            target: destination.parent,
            focus: transitionData.focus,
            preRequisites: [...transitionData.preRequisites.map(preReq => preReq.parent)]
        }
    };
}

const updateTransitionEdge = (transitionElement, transitionData) => {
    transitionElement.data().source = transitionData.originElement.parent;
    transitionElement.data().target = transitionData.destinationElements[0].parent;
    transitionElement.data().preRequisites = [...transitionData.preRequisites.map(preReq => preReq.parent)];
    transitionElement.data().focus = transitionData.focus;
};

export {
    createFocusNode,
    createElementNode,
    updateFocusNode,
    updateElementNode,
    createTransitionEdge,
    updateTransitionEdge
};