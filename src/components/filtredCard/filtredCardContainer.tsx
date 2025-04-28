import { useRef } from "react";
import { UseAppSelector } from "../../service/reactHooks/hooks.ts";
import FiltredCard from "./ui/filtredCard.tsx";
import style from './filtredCardContainer.module.css';
const FiltredCardContainer = () => {
    const cardsList = UseAppSelector((state) => state.sideBarPage.restaurants);
    const scrollRefRating = useRef<HTMLDivElement>(null);

    const scrollAmount = 990;

    const scrollLeft = () => {
        if (scrollRefRating.current) {
            scrollRefRating.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRefRating.current) {
            scrollRefRating.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className={style.cardContainer}>
            <div className={style.minWidth}>
                <div className={style.cardContainerTitle}>
                    <div>
                        <p>Nearby restaurants<i className='bx bxs-baguette'></i></p>
                    </div>
                    <div>
                        <button
                            className={style.scroll}
                            onClick={scrollLeft}
                            style={{marginRight: '10px'}}
                        >
                            ←
                        </button>
                        <button
                            className={style.scroll}
                            onClick={scrollRight}
                        >
                            →
                        </button>
                    </div>
                </div>

                <div className={style.scrollWrapper} ref={scrollRefRating}>
                    {cardsList.length === 0 ? (
                        <p className={style.notFound}>Ресторанов не найдено!</p>
                    ) : (
                        cardsList.map((card, index) => (
                            <FiltredCard card={card} key={`rating-${index}`}/>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default FiltredCardContainer;
