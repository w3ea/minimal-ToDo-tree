import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setToDoList, addTask, toDoListSelector} from '../store/toDoListSlice';
import Task from './Task';
import {getChildItems} from '../helpers/tasks';
import {saveToLocal, getFromLocal} from '../helpers/localStorage';

const Tasks = () => {
    const dispatch = useDispatch();
    const toDoList = useSelector(toDoListSelector);
    const didMount = useRef(false);
    
    //region get and save list to localStorage
    useEffect(() => {
        dispatch(setToDoList(getFromLocal()));
     }, []);
    useEffect(() => {
        if (didMount.current) {
            saveToLocal(toDoList);
        } else {
            didMount.current = true;
        }
     }, [toDoList]);
    //endregion
    
    return (
        <>
            {getChildItems(toDoList.root, toDoList.tasks).map((item, index) => (
                <Task
                    key={item.id}
                    item={item}
                    isFirstChild={index === 0}
                    isRoot={true}
                />
            ))}
        
            <button
                className='-ml-.5 mt-2 pb-20 focus:outline-none'
                onClick={() => dispatch(addTask())}
            >
                <svg className='w-5' viewBox='0 0 20 20'>
                    <circle className='text-transparent transition-colors duration-200 hover:text-gray-200' cx='10.5' cy='10.5' r='9' fill='currentColor'/>
                    <line x1='6' y1='10.5' x2='15' y2='10.5' stroke='#868c90' strokeWidth='1'/>
                    <line x1='10.5' y1='6' x2='10.5' y2='15' stroke='#868c90' strokeWidth='1'/>
                </svg>
            </button>
        </>
    );
};

export default Tasks;