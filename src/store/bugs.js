import { createSlice } from "@reduxjs/toolkit"; // Redux Toolit usses immer
//import {createSelector} from "reselect";
import {apiCallBegan} from "./api";
import moment, { min } from "moment";


let lastId = 0;
//Reducer
const slice = createSlice({
    name:'bugs',
    initialState:{
        list :[],
        loading:false,
        lastFetch:null,
    },
    reducers:{ // maps action => action handler

        bugsRequested:(bugs, action) =>{
            bugs.loading = true
        },

       bugsRequestFail:(bugs, action) =>{
           bugs.loading = false
       },

        bugsReceived:(bugs, action) =>{
            bugs.list = action.payload;
            bugs.loading = false
            bugs.lastFetch = Date.now();
        },

        bugAdded:(bugs,action) =>{
            bugs.list.push({
                id:++lastId,
                description:action.payload.description,
                resolved:false,
               
            });
        },

        bugResolved:(bugs,action) =>{
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        },

        bugAssignedToUser:(bugs, action)=>{
            const {bugId, userId} = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        },

       

        
    }
});

export const {
    bugAdded,
    bugResolved,
    bugAssignedToUser,
    bugsReceived,
    bugsRequested,
    bugsRequestFail
    } = slice.actions;
export default slice.reducer;

const url = "/bugs";

// Action Creator

export const loadBugs = () => (dispatch, getState) =>{
    const lastFetch = getState().entities.bugs;
   
    // const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    console.log(lastFetch);
    // if (diffInMinutes < 10) return;
    
    dispatch(
        apiCallBegan({
        url,
        onStart:bugsRequested.type,
        onError:bugsRequestFail.type,
        onSucess:bugsReceived.type
        })
    );

    
};




// Memoization 
// bugs => get unresolved bugs from the cache
// export const getUnresolvedBugs =  createSelector(
//     state => state.entites.slice,
//     bugs => bugs.filter(bug => !bug.resolved),   
// );











