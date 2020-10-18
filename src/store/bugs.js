import { createSlice } from "@reduxjs/toolkit"; // Redux Toolit usses immer
//import {createSelector} from "reselect";


let lastId = 0;
//Reducer
const slice = createSlice({
    name:'bugs',
    initialState:[],
    reducers:{ // maps action => action handler
        bugAdded:(bugs,action) =>{
            bugs.push({
                id:++lastId,
                description:action.payload.description,
                resolved:false,
               
            });
        },

        bugResolved:(bugs,action) =>{
            const index = bugs.findIndex(bug => bug.id === action.payload.id);
            bugs[index].resolved = true;
        },

        bugAssignedToUser:(bugs, action)=>{
            const {bugId, userId} = action.payload;
            const index = bugs.findIndex(bug => bug.id === bugId);
            bugs[index].userId = userId;
        }

        
    }
});

export const {bugAdded, bugResolved, bugAssignedToUser} = slice.actions;
export default slice.reducer;



// Memoization 
// bugs => get unresolved bugs from the cache
// export const getUnresolvedBugs =  createSelector(
//     state => state.entities.slice,
//     bugs => bugs.filter(bug => !bug.resolved),   
// );











