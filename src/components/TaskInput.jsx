import React, { useState } from 'react'; // Importing necessary hooks from React
import { useDispatch } from 'react-redux'; // Importing useDispatch hook from react-redux to dispatch actions
import { addTask } from '../functionality/tasks/TaskSlics'; // Importing addTask action creator from TaskSlics

const TaskInput = () => {
  // Using useState to manage the local state for the task input
  const [task, setTask] = useState('');
  const dispatch = useDispatch(); // Getting the dispatch function from the Redux store

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (task.trim()) { // Checking if the task input is not empty or just whitespace
      // Dispatching the addTask action with a new task object
      dispatch(addTask({ id: Date.now(), text: task, completed: false }));
      setTask(''); // Resetting the input field after adding the task
    }
  };

  return (
    <div className='flex'>
      {/* Input field for entering a new task */}
      <input
        type="text"
        value={task} // Binding the input value to the task state
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5 text-xl"
        onChange={(e) => setTask(e.target.value)} // Updating the task state on input change
        placeholder='Write Task.....' // Placeholder text for the input field
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleAddTask(); // Adding task on Enter key press
        }}
      />
      {/* Button to add the task */}
      <button onClick={handleAddTask} className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
        Add Task
      </button>
    </div>
  );
};

export default TaskInput; // Exporting the TaskInput component as default
