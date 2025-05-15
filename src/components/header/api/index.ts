import {baseURL} from "../../../service/baseApi";

export const postAiApi = async (prompt: string) => {
    try {
        const response = await fetch(`${baseURL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'credentials': 'include',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error('Ошибка при получении ответа');
        }

        const data = await response.json();
        console.log('Data received from server:', data);
        return data.reply;
    } catch (error) {
        console.error(error);
        throw new Error('Ошибка при получении ответа');
    }
};