import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, addSiblingTask, deleteTask, higherLevel, lowerLevel } from '../../store/toDoListSlice';
import { debounce } from '../../helpers/debounce';
import { isWindows } from '../../helpers/detectOS';

const Input = memo(({item, parentId, isRoot, isFirstChild}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(item.title);
    const didMount = useRef(false);
    
    //region editTitle
    const editTitle = useCallback(debounce(newTitle => {
            dispatch(editTask({id:item.id, title:newTitle}));
        }, 300),
    []);
    useEffect(() => {
        if (didMount.current) {
            editTitle(title);
        } else {
            didMount.current = true;
        }
    }, [title]);
    //endregion
    
    const handleKeyPress = useCallback(event => {
        if (event.key === 'Enter') {
            event.target.blur();
            return dispatch(addSiblingTask(item.id, parentId));
        }
        
        if (event.key === 'Tab') {
            event.preventDefault();
            if (event.shiftKey && !isRoot) {
                return dispatch(lowerLevel({id:item.id, parentId}));
            }
            
            if (!isFirstChild) {
                return dispatch(higherLevel({id:item.id, parentId}));
            }
        }
        
        if (isWindows() && event.ctrlKey && event.shiftKey && event.key === 'Delete') {
            dispatch(deleteTask(item));
        }
    }, []);
    
    return (
        <div className='flex-1 flex items-center space-x-2'>
            <svg tabIndex={-1} className='w-4.25 text-gray-600' viewBox='0 0 18 18' fill='currentColor'>
                <circle cx='9' cy='9' r='3.5'/>
            </svg>
            <input
                className='flex-1 focus:outline-none border-b border-transparent focus:border-gray-200'
                value={title}
                onChange={event => setTitle(event.target.value)}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
});

export default Input;