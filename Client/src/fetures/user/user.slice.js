import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      const payload = action.payload;

      state.isLoggedIn = true;
      state.user = payload;
    },

    removeUser: (state) => {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
