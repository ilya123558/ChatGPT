import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SingIn } from "models/ISingIn";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (build) => ({
    singIn: build.mutation<any, SingIn>({
      query: ({ userAddress, signedData, nonce, accountInteraction }) => ({
        url: `auth/extension`,
        method: "POST",
        credentials: "include" as RequestCredentials,
        body: {
          address: userAddress,
          signed: btoa(atob(signedData.signature) + nonce),
          signature: accountInteraction.publicKey,
        },
      }),
    }),
    logout: build.mutation<any, string>({
      query: (user) => ({
        url: `auth/logout`,
        method: "DELETE",
        body: { user },
        credentials: "include" as RequestCredentials,
      }),
    }),
  }),
});

export const { useSingInMutation, useLogoutMutation } = authAPI;
