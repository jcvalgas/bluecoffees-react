import React from 'react';
import ReactDOM  from 'react-dom';
import Home from './components/Home.js';

ReactDOM.render(
  <React.StrictMode>
    <h1>Hello World</h1>
    <Home />
  </React.StrictMode>,
  document.querySelector("#root")
);
