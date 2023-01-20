import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "models/IUser";

export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL,
    }),
    endpoints: (build) => ({
        getUser: build.query<IUser, any>({
            query: () => ({
                url: `/user`,
                method: 'GET',
                credentials: 'include' as RequestCredentials
            })
        }),
        getUserNonce: build.query<any, string>({
            query: (address) => ({
                url: `/user/nonce/${address}`,
                method: 'GET'
            })
        }),
    }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useGetUserNonceQuery } = userAPI