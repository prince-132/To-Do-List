import React, { useEffect, useState } from 'react'; // Importing necessary hooks from React
import { useSelector, useDispatch } from 'react-redux'; // Importing hooks from react-redux to interact with the Redux store
import { setTasks, deleteTask, toggleComplete, editTask } from '../functionality/tasks/TaskSlics'; // Importing action creators from TaskSlics

const TaskList = () => {
  // Using useSelector to access the tasks state from the Redux store
  const tasks = useSelector((state) => state.tasks);
  // Using useDispatch to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // useEffect to load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      dispatch(setTasks(savedTasks));
    }
  }, [dispatch]);

  // useEffect to save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to handle editing a task, dispatching the editTask action
  const handleEditTask = (id, newText) => {
    dispatch(editTask({ id, text: newText }));
  };

  return (
    // Rendering a list of tasks
    <ul className="space-y-2 w-full">
      {tasks.map((task) => (
        <li
          key={task.id} // Setting a unique key for each task
          className={`flex items-center border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
            task.completed ? 'bg-[#c6e9a7]' : 'bg-[#ccbed7]'
          }`}
        >
          {/* Checkbox to toggle task completion */}
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={task.completed}
            onChange={() => dispatch(toggleComplete(task.id))}
          />
          {/* Displaying task text with line-through if completed */}
          <span
            className={`border outline-none w-full bg-transparent rounded-lg border-transparent ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.text}
          </span>
          {/* Button to delete the task */}
          <button 
            onClick={() => dispatch(deleteTask(task.id))}
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
          >
            ❌
          </button>
          {/* Button to edit the task, prompts the user for new text */}
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

export default TaskList; // Exporting the TaskList component as default
