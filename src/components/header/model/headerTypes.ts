export  interface ChatState {
    prompt: string;
    reply: string | null;
    loading: boolean;
    error: string | null;
}
