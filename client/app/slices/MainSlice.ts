import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INewUserMessage {
    message?: string,
    loadingBotMessage: boolean,
    typeMessage?: 'sendMessage' | 'createChatAndSendMessage'
    chatId?: string
}

interface InitialState {
    loading: boolean,
    activeChatIndex: number | null,
    newUserMessage: INewUserMessage
}


const initialState: InitialState = {
    loading: false,
    activeChatIndex: null,
    newUserMessage: {
        message: '',
        loadingBotMessage: false,
        typeMessage: 'sendMessage',
        chatId: ''
    }
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setActiveChatIndex: (state, action: PayloadAction<null | number>) => {
            state.activeChatIndex = action.payload;
        },
        setNewMessage: (state, action: PayloadAction<INewUserMessage>) => {
            state.newUserMessage = { ...action.payload };
        },
    },
});

export const { setLoading, setActiveChatIndex, setNewMessage } = mainSlice.actions;

export default mainSlice.reducer;