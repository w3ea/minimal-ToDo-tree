import { v4 as uuidv4 } from 'uuid';

export const getChildItems = (children, tasks) => {
    return children.map(id => tasks.find(childItem => childItem.id === id));
};

export const createNewTask = () => {
    return {
        id: uuidv4(),
        title: '',
        children: []
    };
};

export const getNewParentId = (list, itemId) => {
    const newParentIndex = list.findIndex(id => id === itemId) - 1;
    return list[newParentIndex];
};