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
    }),

    policy: builder.query({
      query: () => "/api/v1/settings",
    }),
  }),
});

export const { usePolicyQuery, useUpdatePolicyMutation } = policySlice;
