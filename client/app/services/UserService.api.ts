import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000/api/user",
    }),
    endpoints: (build) => ({
        getHach: build.query<any, string>({
            query: (address) => ({
                url: `/nonce/${address}`,
                method: 'GET'
            })
        }),
    }),
});

export const { useGetHachQuery } = userAPI