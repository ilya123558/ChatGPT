import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SingIn } from "models/ISingIn";

export const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000/api/auth',
    }),
    endpoints: (build) => ({
        singIn: build.mutation<any, SingIn>({
            query: ({ userAddress, signedData, nonce, accountInteraction }) => ({
                url: `extension`,
                method: 'POST',
                credentials: 'include' as RequestCredentials,
                body: {
                    address: userAddress,
                    signed: btoa(atob(signedData.signature) + nonce),
                    signature: accountInteraction.publicKey,
                }
            })
        }),
        logout: build.mutation<any, string>({
            query: (userId) => ({
                url: `logout`,
                method: 'DELETE',
                body: { userId },
                credentials: 'include' as RequestCredentials 
            })
        }),
    }),
});

export const { useSingInMutation, useLogoutMutation } = authAPI