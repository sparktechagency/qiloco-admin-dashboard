import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecentProduct: builder.query({
      query: (page) => {
        return {
          method: "GET",
          url: `/api/v1/admin/dashboard/products?page=${page}`,
        };
      },
      invalidatesTags: ["Overview"],
    }),
    getEarningData: builder.query({
      query: (year) => {
        return {
          method: "GET",
          url: `/api/v1/admin/dashboard/erarming?year=${year}`,
        };
      },
      invalidatesTags: ["Overview"],
    }),
    getPrdouctSalingData: builder.query({
      query: (year) => {
        return {
          method: "GET",
          url: `/api/v1/admin/dashboard/overview?year=${year}`,
        };
      },
      providesTags: ["Overview"],
    }),

    getTotal: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/api/v1/admin/dashboard",
        };
      },
      providesTags: ["Overview"],
    }),
  }),
});

export const {
  useGetTotalQuery,
  useGetPrdouctSalingDataQuery,
  useGetEarningDataQuery,
  useGetRecentProductQuery,
} = authSlice;
