import { createSlice } from "@reduxjs/toolkit";
// import { UsersData } from "../../data/FakeData";

export const userSlice = createSlice({
  name: "users",
  initialState: { value: "" },
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },

    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;