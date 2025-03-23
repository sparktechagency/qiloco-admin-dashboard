import { api } from "../api/baseApi";

const orderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/api/v1/orders",
        };
      },
    }),
  }),
});

export const { useGetOrderQuery } = orderSlice;
