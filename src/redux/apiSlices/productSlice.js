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
    }),
    updateProduct: builder.mutation({
      query: ({ id, updatedData }) => {
        return {
          url: `/category/update-category/${id}`,
          method: "PATCH",
          body: updatedData,
        };
      },
    }),
    // deleteCategory: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/category/delete-category/${id}`,
    //       method: "DELETE",
    //       headers: {
    //         Authorization: `Bearer ${JSON.parse(
    //           localStorage.getItem("token")
    //         )}`,
    //       },
    //     };
    //   },
    // }),
    product: builder.query({
      query: () => {
        return {
          url: "/api/v1/product/",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productSlice;
