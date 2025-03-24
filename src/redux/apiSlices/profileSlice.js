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

      invalidatesTags: ["Profile"],
    }),

    profile: builder.query({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/v1/users/profile",
          body: data,
        };
      },
      providesTags: ["Profile"],
    }),
  }),
});

export const { useProfileQuery, useUpdateProfileMutation } = profileSlice;
