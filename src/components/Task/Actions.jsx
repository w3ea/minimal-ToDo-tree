import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { addChildTask, deleteTask, higherLevel, lowerLevel } from '../../store/toDoListSlice';

const Actions = memo(({item, parentId, isRoot, isFirstChild}) => {
    const dispatch = useDispatch();
    
    return (
        <>
            <button
                className='bg-green-500 bg-opacity-30 p-.25 rounded-full'
                onClick={() => dispatch(addChildTask({parentId: item.id}))}
                onMouseDown={event => event.preventDefault()}
            >
                <svg className='w-5 fill-current text-green-700' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6'/>
                </svg>
            </button>
            <button
                className='bg-red-500 bg-opacity-40 p-.75 rounded-full'
                onClick={() => dispatch(deleteTask(item))}
                onMouseDown={event => event.preventDefault()}
            >
                <svg className='w-4 fill-current text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'/>
                </svg>
            </button>
            
            <div className='flex items-center space-x-1.5'>
                {!isRoot &&
                <button
                    className='bg-gray-200 p-.5 rounded-full'
                    onClick={() => dispatch(lowerLevel({id: item.id, parentId}))}
                    onMouseDown={event => event.preventDefault()}
                >
                    <svg className='w-4.5 text-gray-500' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7'/>
                    </svg>
                </button>}
                {!isFirstChild && (
                    <button
                        className='bg-gray-200 p-.5 rounded-full'
                        onClick={() => dispatch(higherLevel({id: item.id, parentId}))}
                        onMouseDown={event => event.preventDefault()}
                    >
                        <svg className='w-4.5 text-gray-500' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7'/>
                        </svg>
                    </button>
                )}
            </div>
        </>
    );
});

export default Actions;