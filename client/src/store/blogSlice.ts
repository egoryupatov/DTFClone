import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

export interface InitialState {
  isModalActive: boolean;
}

const initialState: InitialState = {
  isModalActive: false,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setIsModalActive: (state, action) => {
      state.isModalActive = action.payload;
    },
  },
});

export const { setIsModalActive } = blogSlice.actions;

export const selectIsModalActive = (state: RootState) =>
  state.blog.isModalActive;

export default blogSlice.reducer;
