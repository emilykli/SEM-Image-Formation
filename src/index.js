import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Layout from './containers/layout';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Layout />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
