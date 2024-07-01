import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-4xl font-bold text-center mb-8 mt-2">To-Do Application </h1>
          <div className="mb-4">
            {/* Todo form goes here */} 
            <TaskInput />
          </div>
          <div className="flex flex-wrap gap-y-3">
            <TaskList />
          </div>
      </div>
    </div>
  );
};

export default App;
