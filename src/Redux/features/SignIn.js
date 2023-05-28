import { createSlice } from "@reduxjs/toolkit";

export const signSlice = createSlice({
  name: "isSignedIn",
  initialState: { value: false },
  reducers: {
    signinTrue: (state, action) => {
      state.value = action.payload;
    },

    signinFalse: (state, action) => {
      state.value = false
    },
  },
});

export const { signinTrue, signinFalse } = signSlice.actions;
export default signSlice.reducer;