const initialValue = {
    root: [],
    tasks: []
};

export const getFromLocal = () => {
    try {
        if (typeof window !== 'undefined') {
            const item = window.localStorage.getItem('toDoList');
            return item ? JSON.parse(item) : initialValue;
        }
    } catch (error) {
        console.log(error);
        return initialValue;
    }
};

export const saveToLocal = value => {
    try {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('toDoList', JSON.stringify(value));
        }
    } catch (error) {
        console.log(error);
    }
};