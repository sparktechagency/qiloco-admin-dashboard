import { api } from "../api/baseApi";

const notificationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    notification: builder.query({
      query: () => {
        return {
          url: `/api/v1/notification`,
          method: "GET",
        };
      },
      invalidatesTags: ["Notification"],
    }),
    read: builder.mutation({
      query: (id) => {
        return {
          url: `/api/v1//notification/${id}`,
          method: "PATCH",
        };
      },
      providesTags: ["Notification"],
    }),
  }),
});

export const { useNotificationQuery, useReadMutation } = notificationSlice;
