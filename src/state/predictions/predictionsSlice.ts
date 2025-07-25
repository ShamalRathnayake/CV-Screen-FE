import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ExtractedJD,
  JDMatchResult,
} from "../../services/predictionApi/predictionApi";

interface PredictionState {
  cvFiles: JDMatchResult[];
  jdFile: ExtractedJD | null;
  selectedCv: JDMatchResult | null;
}

const initialState: PredictionState = {
  cvFiles: [],
  jdFile: null,
  selectedCv: null,
};

const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {
    setCvFiles: (
      state,
      action: PayloadAction<{ cvFiles: JDMatchResult[] }>
    ) => {
      if (action.payload.cvFiles.length === 0) return;
      state.cvFiles = action.payload.cvFiles;
      state.selectedCv = action.payload.cvFiles[0];
    },
    setJdFiles: (state, action: PayloadAction<{ jdFile: ExtractedJD }>) => {
      state.jdFile = action.payload.jdFile;
    },
    setSelectedCvFile: (
      state,
      action: PayloadAction<{ cvFile: JDMatchResult }>
    ) => {
      state.selectedCv = action.payload.cvFile;
    },
  },
});

export const { setCvFiles, setJdFiles, setSelectedCvFile } =
  predictionSlice.actions;
export default predictionSlice.reducer;
