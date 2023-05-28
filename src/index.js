import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import Navbar from "./components/Navbar"; 
import { configureStore } from '@reduxjs/toolkit';
import signinReducer from "./Redux/features/SignIn";
import screenReducer from "./Redux/features/Screen";

const store = configureStore({
  reducer: {
    isSignedIn: signinReducer,
    setScreen: screenReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <Navbar />
        <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
