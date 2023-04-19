import uuid from 'react-uuid';
import { truncateString } from './strings';

const createElementNode = (elementData) => {
    return {
        data: {
            id: uuid(),
            title: truncateString(elementData.name),
            name: elementData.name,
            description: elementData.description,
            link: elementData.link,
            focus: elementData.focus,
        },
        position: {
            x: 100,
            y: 100
        },
        classes: ['state'],
    };
}

export { createElementNode };