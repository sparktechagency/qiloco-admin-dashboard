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
    }),
    read: builder.mutation({
      query: (id) => {
        return {
          url: `/api/v1//notification/${id}`,
          method: "PATCH",
        };
      },
    }),
  }),
});

export const { useNotificationQuery, useReadMutation } = notificationSlice;
