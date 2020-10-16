import React from 'react';
import './App.css';
//import store from "./store/configureStore";
import store from "./OlderMethods/customStore";
import * as actions from "./OlderMethods/bugs"


function App() {

  store.subscribe(()=>{
    console.log("STORE CHANGED");
  })

  store.dispatch(actions.bugAdded("BUG 1"));
  store.dispatch(actions.bugAdded("BUG 2"));
  store.dispatch(actions.bugAdded("BUG 3"));
  store.dispatch(actions.bugResolved(1));

  
 



  return (
    <div className="App">
    <h1>HELLO WORLD</h1>
    </div>
  );
}

export default App;

