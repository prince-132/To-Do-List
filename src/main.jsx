import React from 'react'; // Importing React library for building user interfaces
import ReactDOM from 'react-dom/client'; // Importing ReactDOM for rendering React components to the DOM

import { Provider } from 'react-redux'; // Importing Provider from react-redux to connect Redux with React
import store from './Store'; // Importing the Redux store
import App from './App.jsx'; // Importing the main App component
import './index.css'; // Importing global CSS file

// Rendering the React application into the root element in the HTML
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrapping the App component with Provider to make the Redux store available to the entire app
  <Provider store={store}> 
    <App />
  </Provider>,
)
