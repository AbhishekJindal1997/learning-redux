
import React from 'react';
import './App.css';
import configureStore from "./store/configureStore";
import {loadBugs, resolvedBug, assignBugToUser,} from "./store/bugs"
  

function App() {

  const store = configureStore();
  
  store.dispatch(loadBugs());

  setTimeout(() => store.dispatch(assignBugToUser(1, 4), 2000));






  return (
    <div className="App">
    <h1>HELLO WORLD</h1>
    </div>
  );
}

export default App;

