import { api } from "../api/baseApi";

const earningSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    earning: builder.query({
      query: (page) => {
        return {
          url: `/api/v1/admin/earnings?page=${page}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useEarningQuery } = earningSlice;
