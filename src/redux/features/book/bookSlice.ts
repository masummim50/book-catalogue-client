

import { createSlice } from "@reduxjs/toolkit";

type stateType = {
  genre:string,
  year:string,
  searchText:string
};
const initialState: stateType = {
  genre:"",
  year:"",
  searchText: ""
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
    },
    setSearchText: (state, action)=> {
      state.searchText = action.payload;
    }
  },
});

export const { setGenre, setYear, resetFilter, setSearchText } = bookSlice.actions;
export default bookSlice.reducer;
