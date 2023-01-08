import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../models/IUser";


export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/",
    }),
    endpoints: (build) => ({
        fetchUsers: build.query<IUser[], string>({
            query: () => `users`
        }),
    }),
});

export const { useFetchUsersQuery } = userAPI