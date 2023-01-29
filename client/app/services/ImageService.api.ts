import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ICreateImages {
    prompt: string,
    n: number,
    size: string
}

export const imageAPI = createApi({
    reducerPath: "imageAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL,
    }),
    endpoints: (build) => ({
        createImages: build.mutation<any, ICreateImages>({
            query: (body) => ({
                url: `/generation/image`,
                method: "POST",
                body,
                credentials: "include" as RequestCredentials,
            }),
        }),
    }),
});

export const { useCreateImagesMutation } = imageAPI;
