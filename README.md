# 1 -> React.js Appplication

# To-Do Application

This is a simple Task Management App built with React and Redux. The app allows users to add, edit, delete, and toggle the completion status of tasks. It demonstrates the use of React components, hooks, and state management with Redux.

![](https://github.com/prince-132/To-Do-List/blob/main/ReactJs/Images/Screenshot%202024-06-29%20122946.png)

## Features

- Add new tasks
  
  ![](https://github.com/prince-132/To-Do-List/blob/main/ReactJs/Images/Screenshot%202024-06-29%20125900.png)
  
- Edit existing tasks
 
  ![](https://github.com/prince-132/To-Do-List/blob/main/ReactJs/Images/Screenshot%202024-06-29%20122924.png)
  
- Delete tasks
  
  ![](https://github.com/prince-132/To-Do-List/blob/main/ReactJs/Images/Screenshot%202024-06-29%20130653.png)
  
- Toggle task completion
  
  ![](https://github.com/prince-132/To-Do-List/blob/main/ReactJs/Images/Screenshot%202024-06-29%20122325.png)
  
- Persist tasks in local storage
  
  ![](https://github.com/prince-132/To-Do-List/blob/main/ReactJs/Images/Screenshot%202024-06-29%20130735.png)


## Deployed Link
```bash
https://to-do-list-eight-sepia.vercel.app/
```

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
git clone https://github.com/yourusername/task-management-app.git
```

2. Navigate to the project directory:
```bash
cd ReactJs
```
3. Install the dependencies:
```bash
npm install
```
4. Start the development server:
```bash
npm start
```
As this application is made using Vite bundler
The app should now be running on `http://localhost:5173`.

## Project Structure
```plaintext
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

Code:
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

Code:
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
The Redux store is configured using Redux Toolkit's configureStore function.

Code:
```bash
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './functionality/tasks/TaskSlics';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
Task Slice
The task slice manages the state of tasks and contains the reducers for adding, editing, deleting, and toggling tasks.

Code:
javascript
Copy code
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
- Definition: useState is a Hook that lets you add React state to function components.
- Usage: Used in TaskInput component to manage the state of the input field.
```bash
const [task, setTask] = useState('');
```

### useEffect
- Definition: useEffect is a Hook that lets you perform side effects in function components. It runs after the first render and after every update.
- Usage: Used in TaskList component to load tasks from localStorage when the component mounts and to save tasks to localStorage whenever the tasks state changes.
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
- Definition: useSelector is a Hook that allows you to extract data from the Redux store state, using a selector function.
- Usage: Used in TaskList component to access the tasks state from the Redux store.
```bash
const tasks = useSelector((state) => state.tasks);
```

### useDispatch
- Definition: useDispatch is a Hook that returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.
- Usage: Used in TaskInput and TaskList components to dispatch actions to the Redux store.
```bash
const dispatch = useDispatch();
```


# 2-> Node.js Application

# HODLINFO

HODLINFO is a cryptocurrency information dashboard that fetches and displays data from the WazirX API. It shows real-time information about the top 10 cryptocurrencies including their last traded price, buy and sell prices, percentage differences, and potential savings.

![](https://github.com/prince-132/To-Do-List/blob/main/HODLINFO/Images/quad.jpg)

## Features

- Real-time cryptocurrency data fetching from the WazirX API
- Display of top 10 cryptocurrencies with detailed information
- Calculation of buy/sell price difference and potential savings
- Auto-refresh of data every minute

## Technologies Used

- Node.js
- Express
- Axios
- PostgreSQL
- HTML/CSS
- JavaScript

## Prerequisites

- Node.js
- PostgreSQL

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/hodlinfo.git
   cd hodlinfo
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Set up PostgreSQL:
   - Create a database named `quad_db`.
   - Create a table `cryptos` with the following structure:
     ```sql
     CREATE TABLE cryptos (
       id SERIAL PRIMARY KEY,
       name VARCHAR(50),
       last FLOAT,
       buy FLOAT,
       sell FLOAT,
       volume FLOAT,
       base_unit VARCHAR(10)
     );
     ```

4. Update the PostgreSQL connection configuration in `app.js` if necessary:
   ```javascript
   const pool = new Pool({
     user: 'postgres', // Change if your PostgreSQL user is different
     host: 'localhost',
     database: 'quad_db',
     password: 'your-password', // Update with your PostgreSQL password
     port: 5432,
   });
   ```

## Usage

1. Start the server:
   ```sh
   npm start
   ```

2. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

## Directory Structure

```
hodlinfo/
├── Public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── app.js
├── package.json
└── README.md
```

## API Endpoints

- `/api/cryptos`: Fetches the latest cryptocurrency data from the database.

## How It Works

1. **Server Setup**:
   - The Express server is set up to serve static files from the `Public` directory and handle API requests.
   
2. **Data Fetching**:
   - The `fetchData` function uses Axios to fetch data from the WazirX API and store the top 10 tickers in the PostgreSQL database.
   - Data is fetched initially when the server starts and then every minute using `setInterval`.

3. **Frontend**:
   - The frontend is a simple HTML page styled with CSS that dynamically updates the cryptocurrency data using JavaScript by fetching from the `/api/cryptos` endpoint.





## Contributing

1. Fork the repository
2. Create your feature branch:
   ```sh
   git checkout -b feature/my-new-feature
   ```
3. Commit your changes:
   ```sh
   git commit -am 'Add some feature'
   ```
4. Push to the branch:
   ```sh
   git push origin feature/my-new-feature
   ```
5. Open a pull request


## License
This project is licensed under the MIT License.
```bash
This `README.md` provides a comprehensive overview of the project, including setup instructions, project structure, and detailed explanations of the main components and state management.
```


