import { createSlice } from "@reduxjs/toolkit";

type stateType = {
  accessToken: string;
  user: {
    email: string;
    name: string;
    _id: string;
  };
};
const initialState: stateType = {
  accessToken: "",
  user: {
    email: "",
    name: "",
    _id: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    removeUser: (state) => {
      state.accessToken = "";
      state.user = {
        email: "",
        name: "",
        _id: "",
      };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
