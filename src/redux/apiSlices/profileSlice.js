import { api } from "../api/baseApi";

const profileSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/api/v1/users/profile",
          body: data,
        };
      },
    }),

    profile: builder.query({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/v1/users/profile",
          body: data,
        };
      },
    }),
  }),
});

export const { useProfileQuery, useUpdateProfileMutation } = profileSlice;
