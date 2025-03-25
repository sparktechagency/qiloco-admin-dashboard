import { api } from "../api/baseApi";

const orderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateOrderStatus: builder.mutation({
      query: ({ status, id }) => {
        return {
          url: `/api/v1/orders/${id}`,
          method: "PATCH",
          body: { status }, // Send status as the body
        };
      },
      invalidatesTags: ["Orders"],
    }),
    getOrder: builder.query({
      query: (page) => {
        return {
          method: "GET",
          url: `/api/v1/orders?page={page}`,
        };
      },
      providesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrderQuery, useUpdateOrderStatusMutation } = orderSlice;
