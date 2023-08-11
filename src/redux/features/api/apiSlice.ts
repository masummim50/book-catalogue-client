/* eslint-disable @typescript-eslint/no-unused-vars */
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
const url = "http://localhost:5000/api/v1"

const baseUrl= "https://book-catalogue-server.onrender.com/api/v1/"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).user.accessToken;
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["SingleBook", "books", "lists", "recentBooks", "years"],
  endpoints: () => ({}),
});
