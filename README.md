# To-Do Application

This is a simple Task Management App built with React and Redux. The app allows users to add, edit, delete, and toggle the completion status of tasks. It demonstrates the use of React components, hooks, and state management with Redux.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Toggle task completion
- Persist tasks in local storage

## Technologies Used

- React
- Redux Toolkit
- JavaScript
- CSS

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/To-Do-List.git
```

2. Navigate to the project directory:

```bash
cd To-Do-List
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:
As in this application I've used bundler "Vite" to create it.

```bash
npm run dev
```
The app should now be running on `http://localhost:5173`.

## Project Structure
```bash
.
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── TaskInput.jsx
│   │   └── TaskList.jsx
│   ├── functionality
│   │   └── tasks
│   │       └── TaskSlics.js
│   ├── App.jsx
│   ├── index.css
│   ├── index.js
│   └── Store.js
└── package.json
```

## Components

### TaskInput
The `TaskInput` component is responsible for capturing user input and dispatching an action to add a new task.
#### Code:
```bash
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../functionality/tasks/TaskSlics';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({ id: Date.now(), text: task, completed: false }));
      setTask('');
    }
  };

  return (
    <div className='flex'>
      <input
        type="text"
        value={task}
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5 text-xl"
        onChange={(e) => setTask(e.target.value)}
        placeholder='Write Task.....'
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleAddTask();
        }}
      />
      <button onClick={handleAddTask} className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">Add Task</button>
    </div>
  );
};

export default TaskInput;
```

### TaskList
The `TaskList` component displays the list of tasks and provides functionalities to edit, delete, and toggle the completion status of tasks.
#### Code:
```bash
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, deleteTask, toggleComplete, editTask } from '../functionality/tasks/TaskSlics';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      dispatch(setTasks(savedTasks));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleEditTask = (id, newText) => {
    dispatch(editTask({ id, text: newText }));
  };

  return (
    <ul className="space-y-2 w-full">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex items-center border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
            task.completed ? 'bg-[#c6e9a7]' : 'bg-[#ccbed7]'
          }`}
        >
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={task.completed}
            onChange={() => dispatch(toggleComplete(task.id))}
          />
          <span
            className={`border outline-none w-full bg-transparent rounded-lg border-transparent ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.text}
          </span>
          <button 
            onClick={() => dispatch(deleteTask(task.id))}
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
          >
            ❌
          </button>
          <button 
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
            onClick={() => handleEditTask(task.id, prompt('Edit task:', task.text))}
          >
            ✏️
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
```

## State Management

### Store Configuration
The Redux store is configured using Redux Toolkit's `configureStore` function.

#### Code:
```bash
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './functionality/tasks/TaskSlics';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
```

### TaskSlice
The task slice manages the state of tasks and contains the reducers for adding, editing, deleting, and toggling tasks.
#### Code:
```bash
import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    setTasks: (state, action) => {
      return action.payload;
    },
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const { id, text } = action.payload;
      const existingTask = state.find((task) => task.id === id);
      if (existingTask) {
        existingTask.text = text;
      }
    },
    toggleComplete: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const { setTasks, addTask, deleteTask, editTask, toggleComplete } = tasksSlice.actions;
export default tasksSlice.reducer;
```


## React Hooks Used

### useState
- #### Defintion:
  `useState` is a Hook that lets you add React state to function components.
- #### Usage:
  Used in `TaskInput` component to manage the state of the input field.
  ```bash
  const [task, setTask] = useState('');
  ```

### useEffect
- #### Defintion:
  `useEffect` is a Hook that lets you perform side effects in function components. It runs after the first render and after every update.
- #### Usage:
  Used in `TaskList`  component to load tasks from localStorage when the component mounts and 
  to save tasks to localStorage whenever the tasks state changes.
  ```bash
  useEffect(() => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks) {
    dispatch(setTasks(savedTasks));
  }
  }, [dispatch]);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  ```

### useSelector
- #### Defintion:
  `useSelector` is a Hook that allows you to extract data from the Redux store state, using a 
   selector function.
- #### Usage:
  Used in `TaskList` component to access the tasks state from the Redux store.
  ```bash
  const tasks = useSelector((state) => state.tasks);
  ```

### useDispatch
- #### Defintion:
  `useDispatch` is a Hook that returns a reference to the dispatch function from the Redux 
   store. You may use it to dispatch actions as needed.
- #### Usage:
  Used in `TaskList` and `TaskInput` components to dispatch actions to the Redux store.
  ```bash
  const dispatch = useDispatch();
  ```

## Contributing 

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

```bash

This `README.md` file now includes definitions of the React hooks used in the project, providing a clear understanding of how each hook is
```
