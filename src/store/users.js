import {createSlice} from "@reduxjs/toolkit";

let userId= 0;
const slice = createSlice({
    name:"users",
    initialState:[],
    reducers:{
        usersAdded:(users, action) =>{
            users.push({
                id:++userId,
                name:action.payload.name,
            })
        },
    }
})

export const {usersAdded} = slice.actions;
export default slice.reducer;