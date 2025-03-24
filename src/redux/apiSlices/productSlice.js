import { api } from "../api/baseApi";

const productSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/api/v1/product/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/v1/product/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/api/v1/product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Products"],
    }),

    product: builder.query({
      query: () => {
        return {
          url: "/api/v1/product/",
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productSlice;
