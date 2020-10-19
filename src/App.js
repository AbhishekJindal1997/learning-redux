
import React from 'react';
import './App.css';
import configureStore from "./store/configureStore";
import * as actions from "./store/api";
  

function App() {

  const store = configureStore();

  store.dispatch(actions.apiCallBegan({
    url:'/bugs',
    onSucess:"bugsReceived"
    }));



  return (
    <div className="App">
    <h1>HELLO WORLD</h1>
    </div>
  );
}

export default App;

