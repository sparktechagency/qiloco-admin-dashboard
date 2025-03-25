import { api } from "../api/baseApi";

const policySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updatePolicy: builder.mutation({
      query: ({ updatedData }) => {
        return {
          url: `/api/v1/settings`,
          method: "PATCH",
          body: updatedData,
        };
      },
      invalidatesTags: ["Policies"],
    }),

    policy: builder.query({
      query: () => "/api/v1/settings",
      providesTags: ["Policies"],
    }),
  }),
});

export const { usePolicyQuery, useUpdatePolicyMutation } = policySlice;
