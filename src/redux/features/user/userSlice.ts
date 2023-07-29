import { createSlice } from "@reduxjs/toolkit";

type stateType = {
    accessToken:string,
    user:{
        email:string,
        name:string,
        _id:string
    }
} | object
const initialState:stateType = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action)=> {
            return state = action.payload;
        },
        removeUser: (state)=> {
            return state = {};
        }
    }
})

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;