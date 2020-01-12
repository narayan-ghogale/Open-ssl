import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Page1 from './components/Page1';
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Page1}/>
      </Router>
    </div>
  );
}

export default App;
