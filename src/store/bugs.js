import { createSlice } from "@reduxjs/toolkit"; // Redux Toolit usses immer
//import {createSelector} from "reselect";
import {apiCallBegan} from "./api";
import moment from "moment";


//Reducer
const slice = createSlice({
    name:'bugs',
    initialState:{
        list :[],
        loading:false,
        lastFetch:null,
    },
    reducers:{ // maps action => action handler

        bugsReceived:(bugs, action) =>{
            bugs.list = action.payload;
            bugs.loading = false;
            
        },

        bugsRequested:(bugs, action) =>{
            bugs.loading = true;
            bugs.lastFetch = Date.now();
        },

        bugsRequestFail:(bugs, action) =>{
           bugs.loading = false;
        },

        // command - event
        // addBug - bugAdded
        bugAdded:(bugs,action) =>{
            bugs.list.push(action.payload);
        },

        // resolvedBug(command) - bugResolved (event)
        bugResolved:(bugs,action) =>{
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[index].resolved = true; 
        },

        bugAssignedToUser:(bugs, action)=>{
            const {id:bugId, userId} = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        },     
    }
});

const {
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
    const lastFetch = getState().entities.bugs.lastFetch;
   
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');

    if (diffInMinutes < 10) 
    return;
    
    dispatch(
        apiCallBegan({
        url,
        onStart:bugsRequested.type,
        onError:bugsRequestFail.type,
        onSucess:bugsReceived.type
        })
    ); 
};

export const addBug = bug => apiCallBegan({
    url,
    method:"post",
    data:bug,
    onSucess:bugAdded.type
});

export const resolvedBug = id => apiCallBegan({
    url: url + '/' + id,
    method:"patch",
    data:{resolved:true},
    onSucess:bugResolved.type
});

export const assignBugToUser = (bugId, userId) => apiCallBegan({
    url: url + '/' + bugId,
    method:"patch",
    data:{userId},
    onSucess:bugAssignedToUser.type
})




// Memoization 
// bugs => get unresolved bugs from the cache
// export const getUnresolvedBugs =  createSelector(
//     state => state.entities.slice,
//     bugs => bugs.filter(bug => !bug.resolved),   
// );











