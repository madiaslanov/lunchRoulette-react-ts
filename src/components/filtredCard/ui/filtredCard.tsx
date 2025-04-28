import { useState } from "react";
import style from "./filtredCard.module.css";
import { PlacesType } from "../../card/model/cardTypes.ts";

interface FiltredCardProps {
    card: PlacesType;
}

const FiltredCard: React.FC<FiltredCardProps> = ({ card }) => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <div onClick={openModal} className={style.cardHolder}>
                <img src={card.image_url || "/default-image.jpg"} alt={card.name} />
                <div className={style.description}>
                    <div>
                        <h2>{card.name}</h2>
                        <h3>{card.cuisine}</h3>
                    </div>
                    <button className={style.cardBtn}>
                        <div>{card.wait_time}</div>
                        <div>мин</div>
                    </button>
                </div>
                <div className={style.cardRating}>
                    <span><i className='bx bx-star'></i> {card.rating}</span>
                    <span>{card.wifi ? <i className='bx bx-wifi'></i> : <i className='bx bx-wifi-off'></i>}</span>
                    {card.music && <span><i className='bx bx-music'></i></span>}
                </div>
            </div>

            {isOpen && (
                <div className={style.modalOverlay} onClick={closeModal}>
                    <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                        <img src={card.image_url || "/default-image.jpg"} alt={card.name} />
                        <h2>{card.name}</h2>
                        <p>Кухня: {card.cuisine}</p>
                        <p>Количество мест: {card.seats || "Нет данных"}</p>
                        <p>Средний чек: {card.avg_price_range || "Нет данных"}</p>
                        <p>Музыка: {card.music ? "Атмосферная" : "Отсутствует"}</p>
                        <p>Парковка: {card.parking || "Отсутствует"}</p>
                        <p>Адрес: {card.address}</p>

                        <button onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default FiltredCard;
