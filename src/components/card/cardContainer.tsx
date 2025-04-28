import { useState, useEffect } from "react";
import Card from "./ui/card.tsx";
import { UseAppDispatch, UseAppSelector } from "../../service/reactHooks/hooks.ts";
import { getRestaurant, getRestaurantByRating } from "./model/cardReducer.ts";
import style from './cardContainer.module.css';
import { CSSTransition } from 'react-transition-group';
import coffeeBlast from '../../images/coffee_blast.svg';
import coffeeBlastTwo from '../../images/coffee_blast (1).svg';

const CardContainer = () => {
    const dispatch = UseAppDispatch();
    const cardsList = UseAppSelector((state) => state.cardPage.places);
    const cardListRating = UseAppSelector((state) => state.cardPage.placesByRating);

    const [currentPageTop, setCurrentPageTop] = useState(1);
    const [currentPageRating, setCurrentPageRating] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [loading, setLoading] = useState(true);

    console.log(setPageSize);
    const getPaginatedData = (data: any[], currentPage: number) => {
        const start = (currentPage - 1) * pageSize;
        const end = currentPage * pageSize;
        return data.slice(start, end);
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await dispatch(getRestaurant());
            await dispatch(getRestaurantByRating());
            setLoading(false);
        };
        loadData();
    }, [dispatch]);

    const handlePageChangeTop = (newPage: number) => {
        setCurrentPageTop(newPage);
    };

    const handlePageChangeRating = (newPage: number) => {
        setCurrentPageRating(newPage);
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className={style.cardContainer}>
            <div className={style.cardContainermin}>
                <img src={coffeeBlast} className={style.imageDec} alt="add"/>
                <div className={style.cardContainerTitle}>
                    <div>
                        <p>Top Restaurants</p>
                    </div>
                </div>
                <CSSTransition
                    in={true}
                    timeout={500}
                    classNames="scrollWrapper"
                    unmountOnExit
                >
                    <div className={style.scrollWrapper}>
                        {getPaginatedData(cardsList, currentPageTop).map((card, index) => (
                            <Card key={card.id || index} card={card} index={index}/>
                        ))}
                    </div>
                </CSSTransition>
                <div className={style.pagination}>
                    <button
                        onClick={() => handlePageChangeTop(currentPageTop - 1)}
                        disabled={currentPageTop === 1}
                    >
                        Назад
                    </button>
                    <span>Страница {currentPageTop}</span>
                    <button
                        onClick={() => handlePageChangeTop(currentPageTop + 1)}
                        disabled={getPaginatedData(cardsList, currentPageTop).length < pageSize}
                    >
                        Вперед
                    </button>
                </div>
            </div>

            <div className={style.cardContainermax}>
                <img src={coffeeBlastTwo} className={style.imageSec} alt=""/>
                <div className={style.cardContainerTitle}>
                    <div>
                        <p>Best rating <i className='bx bx-star bx-spin bx-rotate-90'></i></p>
                    </div>
                </div>
                <CSSTransition
                    in={true}
                    timeout={500}
                    classNames="scrollWrapper"
                    unmountOnExit
                >
                    <div className={style.scrollWrapper}>
                        {getPaginatedData(cardListRating, currentPageRating).map((card, index) => (
                            <Card key={card.id || index} card={card} index={index}/>
                        ))}
                    </div>
                </CSSTransition>

                <div className={style.pagination}>
                    <button
                        onClick={() => handlePageChangeRating(currentPageRating - 1)}
                        disabled={currentPageRating === 1}
                    >
                        Назад
                    </button>
                    <span>Страница {currentPageRating}</span>
                    <button
                        onClick={() => handlePageChangeRating(currentPageRating + 1)}
                        disabled={getPaginatedData(cardListRating, currentPageRating).length < pageSize}
                    >
                        Вперед
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardContainer;
