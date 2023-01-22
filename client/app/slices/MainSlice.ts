import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    loading: boolean,
    activeChatIndex: number | null
}

const initialState: InitialState = {
    loading: false,
    activeChatIndex: null
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setActiveChatIndex: (state, action) => {
            state.activeChatIndex = action.payload;
        },
    },
});

export const { setLoading, setActiveChatIndex } = mainSlice.actions;

export default mainSlice.reducer;