import { createSlice } from '@reduxjs/toolkit';
import { createNewTask, getNewParentId } from '../helpers/tasks';

const initialState = {
    root: [],
    tasks: []
};

const toDoListSlice = createSlice({
    name: 'toDoList',
    initialState,
    reducers: {
        setToDoList: (state, { payload }) => {
            state = payload;
            return state;
        },
        addTask: state => {
            const newTask = createNewTask();
            state = {
                root: [...state.root, newTask.id],
                tasks: [...state.tasks, newTask]
            };
            return state;
        },
        addSiblingToRoot: (state, { payload }) => {
            const newTask = createNewTask();
            const siblingPosition = state.root.findIndex(rootId => rootId === payload.id);
            const root = [...state.root];
            // put new task id after his sibling
            root.splice(siblingPosition + 1, 0, newTask.id);

            state = {
                root,
                tasks: [...state.tasks, newTask]
            };

            return state;
        },
        addChildTask: (state, { payload }) => {
            const newTask = createNewTask();
            state.tasks = state.tasks.map(item => {
                if (item.id === payload.parentId) {
                    if (payload.siblingId) {
                        // put new task is after his sibling
                        const instanceChildren = [...item.children];
                        const siblingPosition = instanceChildren.findIndex(id => id === payload.siblingId);
                        instanceChildren.splice(siblingPosition + 1, 0, newTask.id);
                        item.children = instanceChildren;
                    } else {
                        item.children = [...item.children, newTask.id];
                    }
                }
    
                return item;
            });
            
            state.tasks = [...state.tasks, newTask];
            
            return state;
        },
        editTask: (state, { payload }) => {
            state.tasks = state.tasks.map(item => {
                if (item.id === payload.id) {
                    item.title = payload.title;
                }
            
                return item;
            });
        
            return state;
        },
        deleteTask: (state, { payload }) => {
            if (state.root.includes(payload.id) && ! payload.children.length) {
                // remove task from root
                state.root = state.root.filter(rootId => rootId !== payload.id);
                // remove task from tasks
                state.tasks = state.tasks.filter(item => item !== payload.id);
                
                return state;
            }
    
            // get all task's children in the tree list
            let list = [payload.id];
            const getAllChildren = (children) => {
                children.map(id => state.tasks.find(childItem => childItem.id === id)).map(item => {
                    list.push(item.id);
            
                    if (item.children.length) {
                        return getAllChildren(item.children);
                    }
                });
            };
            getAllChildren(payload.children);
    
            // remove the task with all his children from list
            state.tasks = state.tasks.filter(item => !list.includes(item.id));
            if (state.root.includes(payload.id)) {
                state.root = state.root.filter(rootId => rootId !== payload.id);
                
                return state;
            }
    
            // remove child id from parent
            state.tasks = state.tasks.map(item => {
                if (item.children.includes(payload.id)) {
                    item.children = item.children.filter(childId => childId !== payload.id);
                }
        
                return item;
            });
            
            return state;
        },
        lowerLevel: (state, { payload }) => {
            const grandItem = state.tasks.find(item => item.children.some(childId => childId === payload.parentId));
    
            state.tasks = state.tasks.map(item => {
                if (item.id === payload.parentId) {
                    // remove task id from his parent children
                    item.children = item.children.filter(childId => childId !== payload.id);
                } else if (grandItem && item.id === grandItem.id) {
                    // put task id after his sibling in the grandparent children
                    const instanceChildren = [...item.children];
                    const parentPosition = instanceChildren.indexOf(payload.parentId);
                    instanceChildren.splice(parentPosition + 1, 0, payload.id);
                    item.children = instanceChildren;
                } else if (! grandItem && item.id === payload.id) {
                    // put task id after his sibling in the root
                    const siblingPosition = state.root.findIndex(rootId => rootId === payload.parentId);
                    const instanceRoot = [...state.root];
                    instanceRoot.splice(siblingPosition + 1, 0, payload.id);
    
                    state.root = instanceRoot;
                }
        
                return item;
            })
            
            
            return state;
        },
        higherLevel: (state, { payload }) => {
            if (! payload.parentId) {
                const newParentId = getNewParentId(state.root, payload.id);
                // remove task from root
                state.root = state.root.filter(rootId => rootId !== payload.id);
    
                state.tasks = state.tasks.map(item => {
                    if (item.id === newParentId) {
                        // add task id to new parent children
                        item.children = [...item.children, payload.id];
                    }
            
                    return item;
                })
        
                return state;
            }
    
            const parentItem = state.tasks.find(item => item.id === payload.parentId);
            const newParentId = getNewParentId(parentItem.children, payload.id);
    
            state.tasks = state.tasks.map(item => {
                if (item.id === payload.parentId) {
                    // remove task id from parent children
                    item.children = item.children.filter(childId => childId !== payload.id);
                } else if (item.id === newParentId) {
                    // add task id to new parent children
                    item.children = [...item.children, payload.id];
                }
        
                return item;
            })
            
            return state;
        },
    }
});

export const toDoListSelector = (state) => state.toDoList;
export const { setToDoList, addTask, addChildTask, addSiblingToRoot, editTask, deleteTask, lowerLevel, higherLevel } = toDoListSlice.actions;
export default toDoListSlice.reducer;

export const addSiblingTask = (id, parentId) => async dispatch => {
    if (parentId) {
        dispatch(addChildTask({id, parentId}));
        return false;
    }
    
    dispatch(addSiblingToRoot({id}));
};
