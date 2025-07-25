import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setCvFiles,
  setJdFiles,
} from "../../state/predictions/predictionsSlice";
import type { RootState } from "../../state/store";

export type PredictionRequest = {
  cvFileName?: string;
  cvFileNames?: string[];
  jdFileName?: string;
  jdText?: string;
  isMultiple?: boolean;
};

type ApiResponse = {
  status: boolean;
  statusCode: number;
  message?: string;
  data?: JDMatchingData;
};

type JDMatchingData = {
  extractedJD?: ExtractedJD;
  result?: JDMatchResult[];
};

export type ExtractedJD = {
  jobTitle?: string;
  skillsRequired?: string[];
  responsibilities?: string[];
  qualifications?: string[];
  preferredQualifications?: string[];
  softSkills?: string[];
  jobDescriptionSummary?: string;
  source?: string;
  benefits?: string[];
};

export type JDMatchResult = {
  cosineSimilarity?: CosineSimilarity;
  extractedCv?: ExtractedCv;
  cvId?: string;
  jdId?: string;
  predictionId?: string;
  image?: string;
};

type CosineSimilarity = {
  total?: number;
  technical?: number;
  education?: number;
  workExp?: number;
  raw?: number;
  hireProbability?: number;
  hireDecision?: number;
};

type ExtractedCv = {
  personalInfo?: PersonalInfo;
  skills?: CvSkills;
  education?: Education[];
  workExperience?: WorkExperience[];
  projects?: Project[];
};

type PersonalInfo = {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  gender?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  dob?: Date;
};

type CvSkills = {
  technicalSkills?: string[];
  languages?: ProgrammingLanguage[];
};

type ProgrammingLanguage = {
  language?: string;
  proficiency?: string;
};

type Education = {
  institution?: string;
  degree?: string;
  startDate?: string;
  endDate?: string | null;
  gpa?: string;
};

type WorkExperience = {
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string | null;
};

type Project = {
  title?: string;
  description?: string;
  technologies?: string[];
  url?: string;
};

export const predictionApi = createApi({
  reducerPath: "predictionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    predict: builder.mutation<ApiResponse, PredictionRequest>({
      query: ({ isMultiple, ...rest }) => ({
        url: isMultiple ? "prediction/multi" : "prediction",
        method: "POST",
        body: rest,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.status && data?.data?.extractedJD && data?.data?.result) {
            dispatch(
              setCvFiles({
                cvFiles: data.data.result,
              })
            );
            dispatch(
              setJdFiles({
                jdFile: data.data.extractedJD,
              })
            );
          }
        } catch (err) {
          console.error("Prediction error:", err);
        }
      },
    }),
  }),
});

export const { usePredictMutation } = predictionApi;
