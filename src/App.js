
import React from 'react';
import './App.css';
import configureStore from "./store/configureStore";
import {bugAdded, bugResolved, bugAssignedToUser}  from "./store/bugs"; 
import {projectAdded} from "./store/projects";
import {usersAdded} from "./store/users";
  

function App() {

  const store = configureStore();

  store.subscribe(()=>{
    console.log("Store Changed !!");
  });

  store.dispatch(projectAdded({name:"project 1"}));
  store.dispatch(bugAdded({description:"BUG 1"}));
  store.dispatch(bugAdded({description:"BUG 2"}));
  store.dispatch(bugAdded({description:"BUG 3"}));
  store.dispatch(bugResolved({id:1}));

  store.dispatch(usersAdded({name:"Abhishek"}));
  store.dispatch(usersAdded({name:"Chandeep"}));

  store.dispatch(bugAssignedToUser({bugId:1, userId:1}));


  // Selectors
  //const unresolvedBugs = store.getState().entites.bugs.filter(bug => !bug.resolved);

  // Getting list of bug assigned 
  const findBugAssigned = id => {
    const bugAssigned = store.getState().entites.bugs.filter(bug => bug.userId === id);
    return bugAssigned;
  }
  console.log(findBugAssigned(1));
      
  
  
      
  // NOT WORING 
  //  const unresolvedBugs = getUnresolvedBugs(store.getState());
  //  console.log(unresolvedBugs);

  return (
    <div className="App">
    <h1>HELLO WORLD</h1>
    </div>
  );
}

export default App;

