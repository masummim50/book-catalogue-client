import { createSlice } from "@reduxjs/toolkit";

type stateType = {
    accessToken:string,
    user:object
} | null
const initialState:stateType = null;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action)=> {
            return state = action.payload;
        },
        removeUser: (state)=> {
            return state = null;
        }
    }
})

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;