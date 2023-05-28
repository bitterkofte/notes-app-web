import { createSlice } from "@reduxjs/toolkit";

export const screenSlice = createSlice({
  name: "screen",
  initialState: { value: "auth" },
  reducers: {
    setScreen: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { setScreen } = screenSlice.actions;
export default screenSlice.reducer;