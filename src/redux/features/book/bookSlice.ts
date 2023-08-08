

import { createSlice } from "@reduxjs/toolkit";

type stateType = {
  genre:string,
  year:string
};
const initialState: stateType = {
  genre:"",
  year:""
};

const bookSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setGenre: (state, action) => {
      state.genre = action.payload
    },
    setYear: (state,action) => {
      state.year = action.payload
    },
    resetFilter: (state)=> {
        state.genre = "";
        state.year = ""
    }
  },
});

export const { setGenre, setYear, resetFilter } = bookSlice.actions;
export default bookSlice.reducer;
