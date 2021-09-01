import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Employee from './component/Employee';
import Home from './component/Home';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/addEmployee' component={Home}></Route>
          <Route exact path='/' component={Employee}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
