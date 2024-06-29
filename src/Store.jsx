import { configureStore } from '@reduxjs/toolkit'; // Importing configureStore from Redux Toolkit to simplify store setup
import tasksReducer from './functionality/tasks/TaskSlics'; // Importing the tasks reducer from TaskSlics file

// Configuring the Redux store with the tasks reducer
const store = configureStore({
  reducer: {
    tasks: tasksReducer, // Assigning tasksReducer to handle state updates for 'tasks'
  },
});

export default store; // Exporting the store for use in the application
