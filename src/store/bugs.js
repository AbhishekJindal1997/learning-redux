import { createSlice } from "@reduxjs/toolkit"; // Redux Toolit usses immer

let lastId = 0;


//Reducer
const slice = createSlice({
    name:'bugs',
    initialState:[],
    reducers:{
        // action => action handler
        bugAdded:(bugs,action) =>{
            bugs.push({
                id:++lastId,
                description:action.payload.description,
                resolved:false
            });
        },

        bugResolved:(bugs,action) =>{
            const index = bugs.findIndex(bug => bug.id === action.payload.id);
            bugs[index].resolved = true;
        }
    }
});

console.log(slice);
export const {bugAdded, bugResolved} = slice.actions;
export default slice.reducer;







