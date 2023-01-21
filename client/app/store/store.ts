import { combineReducers, configureStore } from "@reduxjs/toolkit";

import loadingSlice from '../slices/LoadingSlice'

import { userAPI } from "../services/UserService.api";
import { authAPI } from "../services/AuthService.api";

const rootReducer = combineReducers({
    loading: loadingSlice,
    [userAPI.reducerPath]: userAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
});

export const store = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => (
            getDefaultMiddleware()
                .concat(userAPI.middleware)
                .concat(authAPI.middleware)
        )
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];