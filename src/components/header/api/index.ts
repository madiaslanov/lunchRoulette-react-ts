import {baseURL} from "../../../service/baseApi";

export const postAiApi = async (prompt: string) => {
    try {
        const response = await fetch(`${baseURL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error('Ошибка при получении ответа');
        }

        const data = await response.json();
        console.log('Data received from server:', data); // логируем ответ от сервера
        return data.reply; // возвращаем только поле `reply` из ответа
    } catch (error) {
        console.error(error);
        throw new Error('Ошибка при получении ответа');
    }
};