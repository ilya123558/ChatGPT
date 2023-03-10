import { combineReducers, configureStore } from "@reduxjs/toolkit";

import mainSlice from '../slices/MainSlice'

import { userAPI } from "../services/UserService.api";
import { authAPI } from "../services/AuthService.api";
import { chatAPI } from "@services/ChatService.api";

const rootReducer = combineReducers({
    state: mainSlice,
    [userAPI.reducerPath]: userAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [chatAPI.reducerPath]: chatAPI.reducer
});

export const store = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => (
            getDefaultMiddleware()
                .concat(userAPI.middleware)
                .concat(authAPI.middleware)
                .concat(chatAPI.middleware)
        )
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];