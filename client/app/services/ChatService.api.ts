import { IChat, ISendMessageOrCreateChat, IUpdataChatName } from './../models/IChat';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatAPI = createApi({
    reducerPath: "chatAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL,
    }),
    tagTypes: ['Chat'],
    endpoints: (build) => ({
        getAllChats: build.query<IChat[], unknown>({
            query: () => ({
                url: `/chat`,
                method: 'GET',
                credentials: 'include' as RequestCredentials,
            }),
            providesTags: () => ['Chat']
        }),
        sendMessageOrCreateChat: build.mutation<any, ISendMessageOrCreateChat>({
            query: (props) => ({
                url: `/chat`,
                method: 'POST',
                credentials: 'include' as RequestCredentials,
                body: { ...props }
            }),
            invalidatesTags: ['Chat']
        }),
        updateChatName: build.mutation<any, IUpdataChatName>({
            query: (body) => ({
                url: `/chat/update`,
                method: 'PUT',
                credentials: 'include' as RequestCredentials,
                body
            }),
            invalidatesTags: ['Chat']
        }),
        deleteChat: build.mutation<any, string>({
            query: (chatId) => ({
                url: `/chat/delete/${chatId}`,
                method: 'DELETE',
                credentials: 'include' as RequestCredentials,
            }),
            invalidatesTags: ['Chat']
        }),
        deleteAllChats: build.mutation<any, unknown>({
            query: () => ({
                url: `/chat/delete-all`,
                method: 'DELETE',
                credentials: 'include' as RequestCredentials,
            }),
            invalidatesTags: ['Chat']
        }),
    }),
});

export const { useGetAllChatsQuery, useSendMessageOrCreateChatMutation, useDeleteChatMutation, useUpdateChatNameMutation, useDeleteAllChatsMutation } = chatAPI