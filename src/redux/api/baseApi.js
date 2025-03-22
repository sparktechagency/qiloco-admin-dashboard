import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.0.60.126:6007",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        headers.set("Authorization", `Bearer ${token}`);
      } catch (error) {
        console.error("Invalid token format:", error);
      }
    }
    return headers;
  },
});

export const imageUrl = "http://10.0.60.126:6007";

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [],
});
