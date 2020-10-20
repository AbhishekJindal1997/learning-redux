
import React from 'react';
import './App.css';
import configureStore from "./store/configureStore";
import {loadBugs} from "./store/bugs"
  

function App() {

  const store = configureStore();
  // UI Layer
  store.dispatch(loadBugs());

  setTimeout(store.dispatch(loadBugs()), 2000);




  return (
    <div className="App">
    <h1>HELLO WORLD</h1>
    </div>
  );
}

export default App;

