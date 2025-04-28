import style from './card.module.css';
import {PlacesType} from "../model/cardTypes.ts";
import { useState } from "react";

interface CardPropsType {
    card: PlacesType;
    index: number | null;
}

const Card: React.FC<CardPropsType> = ({ card }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <div onClick={openModal} className={style.cardHolder}>
                <img src={card.image_url} alt='img' />
                <div className={style.description}>
                    <div className={style.descTitle}>
                        <h2>{card.name}</h2>
                        <h3>{card.cuisine}</h3>
                    </div>
                    <div>
                        <button className={style.cardBtn}>
                            <div>{card.wait_time}</div>
                            <div style={{ fontSize: '12px' }}>мин</div>
                        </button>
                    </div>
                </div>
                <div className={style.cardRating}>
                    <span><i className='bx bx-star'></i> {card.rating}</span>
                    <span>{card.wifi ? <i className='bx bx-wifi'></i> : <i className='bx bx-wifi-off'></i>}</span>
                    <span>{card.music ? <i className='bx bx-music'></i> : null}</span>
                </div>
            </div>


            {isOpen && (
                <div className={style.modalOverlay} onClick={closeModal}>
                    <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                        <img src={card.image_url} alt=""/>
                        <h2>{card.name}</h2>
                        <p>Кухни: {card.cuisine}</p>
                        <p>Количество Мест: {card.seats ? card.seats : "Нет данных"}</p>
                        <p>Средний чек на человека: {card.avg_price_range ? card.avg_price_range : "Нет данных"} </p>
                        <p>Музыка в зале: {card.music ? "Атмосферная" : "Отсутвует"}</p>
                        <p>Парковка: {card.parking ? card.parking : "Отсутсвует"}</p>
                        <p>Адрес: {card.address}</p>

                        <button onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Card;
