import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const openAiAPI = createApi({
    reducerPath: "openAiAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL,
    }),
    endpoints: (build) => ({
        createImg: build.mutation<any, string>({
            query: (message) => ({
                url: `/openai/create/image/${message}`,
                method: 'POST',
            })
        }),
    }),
});

export const { useCreateImgMutation } = openAiAPI