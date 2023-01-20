import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatAPI = createApi({
    reducerPath: "chatAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL,
    }),
    endpoints: (build) => ({
        sendMessageChat: build.mutation<any, string>({
            query: (message) => ({
                url: `/chat`,
                method: 'POST',
                body: {message}
            })
        }),
    }),
});

export const { useSendMessageChatMutation } = chatAPI