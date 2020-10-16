import store from "./customStore";
import * as actions from "./bugs"


function index() {

  store.subscribe(()=>{
    console.log("STORE CHANGED");
  })

  store.dispatch(actions.bugAdded({description:"BUG 1"}));
  store.dispatch(actions.bugAdded({description:"BUG 2"}));
  store.dispatch(actions.bugAdded({description:"BUG 3"}));
  store.dispatch(actions.bugResolved({id:1}));

}

export default index;