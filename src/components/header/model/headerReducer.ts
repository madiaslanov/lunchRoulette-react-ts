// headerReducer.ts

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postAiApi } from '../api';

const initialState = {
    prompt: '',
    messages: [] as { text: string; sender: 'user' | 'ai' }[],
    loading: false,
    error: '',
};

export const fetchAiResponse = createAsyncThunk(
    'chat/fetchAiResponse',
    async (prompt: string) => {
        try {
            const reply = await postAiApi(prompt);
            return reply;
        } catch (error) {
            throw new Error('Ошибка при получении ответа');
        }
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setPrompt: (state, action) => {
            state.prompt = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAiResponse.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchAiResponse.fulfilled, (state, action) => {
                state.loading = false;

                state.messages.push({ text: action.payload, sender: 'ai' });
            })
            .addCase(fetchAiResponse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка при получении ответа';
            });
    },
});

export const { setPrompt, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
