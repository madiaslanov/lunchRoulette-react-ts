import style from './header.module.css';

const Header = () => {

    return (
        <div className={style.holder}>
            <div className={style.logoHeader}>
                <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f37d-fe0f.svg" alt="img" />
                <h2>
                    Lunch Roulette
                </h2>
            </div>

        </div>
    );
}

export default Header;
