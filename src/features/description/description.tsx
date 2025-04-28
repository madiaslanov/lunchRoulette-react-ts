import { fetchAiResponse, setPrompt, addMessage } from "../../components/header/model/headerReducer.ts";
import { UseAppDispatch, UseAppSelector } from "../../service/reactHooks/hooks.ts";
import style from './descripion.module.css';

const Description = () => {
    const dispatch = UseAppDispatch();
    const { prompt, messages, loading, error } = UseAppSelector(
        (state) => state.chatPage
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt) {
            dispatch(addMessage({ text: prompt, sender: 'user' }));
            dispatch(fetchAiResponse(prompt));

            dispatch(setPrompt(''));
        }
    };

    return (
        <div className={style.descriptionContainer}>
            <div className={style.description}>
                <h2>Lunch Roulette</h2>
                <p>Choose the best restaurant nearby!</p>
            </div>

            <div className={style.gptChat}>
                <h1 className="text-2xl font-bold mb-4">Помощь AI Ассистента</h1>
                <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                    <input
                        type="text"
                        className="border p-2 flex-1 rounded"
                        placeholder="Напишите ваш запрос..."
                        value={prompt}
                        onChange={(e) => dispatch(setPrompt(e.target.value))}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                        disabled={loading}
                    >
                        {loading ? 'Ищу...' : 'Отправить'}
                    </button>
                </form>

                {error && (
                    <div className="bg-red-100 p-4 rounded shadow">
                        <h2 className="font-semibold mb-2">Ошибка:</h2>
                        <p>{error}</p>
                    </div>
                )}

                <div className={style.chatMessages}>
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            <p>{message.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Description;
