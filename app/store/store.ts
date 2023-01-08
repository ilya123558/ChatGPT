import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userAPI } from "../services/UserService.api";

const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
});

export const store = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => (
            getDefaultMiddleware()
                .concat(userAPI.middleware)
        )
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];