import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  isLoading: boolean;
}

const initialState: SettingsState = {
  isLoading: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { setLoadingState } = settingsSlice.actions;
export default settingsSlice.reducer;
