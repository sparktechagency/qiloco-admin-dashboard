import { api } from "../api/baseApi";

const earningSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // createEarning: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/api/v1/Earning/create",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    // }),
    // updateEarning: builder.mutation({
    //   query: ({ id, updatedData }) => {
    //     return {
    //       url: `/category/update-category/${id}`,
    //       method: "PATCH",
    //       body: updatedData,
    //     };
    //   },
    // }),

    earning: builder.query({
      query: () => {
        return {
          url: "/api/v1/admin/earnings",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useEarningQuery,
  //   useCreateProductMutation,
  //   useUpdateProductMutation,
} = earningSlice;
