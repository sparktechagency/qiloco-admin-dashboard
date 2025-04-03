import { api } from "../api/baseApi";

const inquirySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    inquiry: builder.query({
      query: (page) => {
        return {
          method: "GET",
          url: `/api/v1/contact?page=${page}`,
        };
      },
      providesTags: ["Inquiry"],
    }),
  }),
});

export const { useInquiryQuery } = inquirySlice;
