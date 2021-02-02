import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ToDoListSlice from '../store/toDoListSlice';
import Tasks from '../components/Tasks';

const store = configureStore({
    reducer: {
        toDoList: ToDoListSlice
    }
});

const index = () => {
    return (
        <Provider store={store}>
            <Tasks/>
        </Provider>
    );
};

export default index;