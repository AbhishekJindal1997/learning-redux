
import React from 'react';
import './App.css';
import configureStore from "./store/configureStore";
import * as actions from "./store/bugs" 
import {projectAdded} from "./store/projects"



function App() {

  const store = configureStore();

  store.subscribe(()=>{
    console.log("Store Changed !!");
  });

  store.dispatch(projectAdded({name:"project 1"}));

  store.dispatch(actions.bugAdded({description:"BUG 1"}));
  store.dispatch(actions.bugAdded({description:"BUG 2"}));
  store.dispatch(actions.bugAdded({description:"BUG 3"}));
  store.dispatch(actions.bugResolved({id:1}));

  return (
    <div className="App">
    <h1>HELLO WORLD</h1>
    </div>
  );
}

export default App;

