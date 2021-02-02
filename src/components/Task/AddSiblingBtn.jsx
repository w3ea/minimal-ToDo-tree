import { useDispatch } from 'react-redux';
import cls from 'clsx';
import { addSiblingTask } from '../../store/toDoListSlice';

const AddSiblingBtn = ({id, parentId, isRoot}) => {
    const dispatch = useDispatch();
    
    return (
        <button
            className={cls('absolute bottom-0 left-0 ml-6 mb-3 opacity-0 transition-opacity duration-200 hover:opacity-100', {'-ml-.5': isRoot})}
            onClick={() => dispatch(addSiblingTask(id, parentId))}
        >
            <svg className='w-5' viewBox='0 0 20 20'>
                <circle className='text-gray-200' cx='10.5' cy='10.5' r='9' fill='currentColor'/>
                <line x1='6' y1='10.5' x2='15' y2='10.5' stroke='#868c90' strokeWidth='1'/>
                <line x1='10.5' y1='6' x2='10.5' y2='15' stroke='#868c90' strokeWidth='1'/>
            </svg>
        </button>
    );
};

export default AddSiblingBtn;