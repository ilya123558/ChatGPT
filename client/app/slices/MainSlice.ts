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
    newUserMessage: INewUserMessage,
    isCode: boolean
}


const initialState: InitialState = {
    loading: false,
    activeChatIndex: null,
    newUserMessage: {
        message: '',
        loadingBotMessage: false,
        typeMessage: 'sendMessage',
        chatId: ''
    },
    isCode: false
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
        setIsCode: (state, action: PayloadAction<boolean>) => {
            state.isCode = action.payload;
        },
    },
});

export const { setLoading, setActiveChatIndex, setNewMessage, setIsCode } = mainSlice.actions;

export default mainSlice.reducer;