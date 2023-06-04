import uuid from 'react-uuid';

const createFocusNode = (focus, position) => {
    return {
        data: {
            id: uuid(),
            title: "Foco: " + focus,
        },
        position: {
            x: position.x,
            y: position.y
        },
    };
}

const createElementNode = (elementData, parentId, position) => {
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
            x: position.x,
            y: position.y
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
    const preRequisites = [...transitionData.preRequisites.map(preReq => preReq.parent)];
    return {
        data: {
            id: uuid(),
            source: transitionData.originElement.parent,
            target: destination.parent,
            focus: transitionData.focus,
            preRequisites: preRequisites.length > 0 ? preRequisites : null
        }
    };
}

const updateTransitionEdge = (transitionElement, transitionData) => {
    const preRequisites = [...transitionData.preRequisites.map(preReq => preReq.parent)];
    transitionElement.data().source = transitionData.originElement.parent;
    transitionElement.data().target = transitionData.destinationElements[0].parent;
    transitionElement.data().preRequisites = preRequisites.length > 0 ? preRequisites : null;
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