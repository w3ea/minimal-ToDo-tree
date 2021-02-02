import { memo, useState } from 'react';
import cls from 'clsx';
import { useSelector } from 'react-redux';
import { toDoListSelector } from '../../store/toDoListSlice';
import {getChildItems} from '../../helpers/tasks';
import Input from './Input';
import Actions from './Actions';
import AddSiblingBtn from './AddSiblingBtn';

const Task = memo(({item, isRoot, isFirstChild, parentId = 0}) => {
    const { tasks } = useSelector(toDoListSelector);
    const [showActions, setShowActions] = useState(false);
    
    return (
        <div className={cls('relative', {'border-l border-gray-200 border-solid pl-6.5 ml-2': !isRoot})}>
            <div
                className='flex items-center space-x-5 py-2'
                onFocus={() => setShowActions(true)}
                onBlur={() => setShowActions(false)}
            >
                <Input item={item} parentId={parentId} isRoot={isRoot} isFirstChild={isFirstChild}/>
                
    
                {showActions && <Actions item={item} parentId={parentId} isRoot={isRoot} isFirstChild={isFirstChild} />}
            </div>
            
            {getChildItems(item.children, tasks).map((subItem, index) => (
                <Task
                    key={subItem.id}
                    item={subItem}
                    isFirstChild={index === 0}
                    parentId={item.id}
                />
            ))}
            
            {getChildItems(item.children, tasks).length > 0 &&
                <AddSiblingBtn id={item.id} parentId={parentId} isRoot={isRoot} />
            }
        </div>
    );
});

export default Task;