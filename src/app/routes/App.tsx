
import { Route, Routes } from "react-router-dom";
import style from "../style/App.module.css";
import Header from "../../components/header/ui/header.tsx";
import SidebarContainer from "../../components/sideBar/sidebarContainer.tsx";
import FiltredCardContainer from "../../components/filtredCard/filtredCardContainer.tsx";
import { lazy, Suspense } from "react";
import Description from "../../features/description/description.tsx";

function App() {


    const CardContainer = lazy(() => import("../../components/card/cardContainer.tsx"));



    return (
        <div>
            <Header />
            <Description />
            <div className={style.appWraper}>
                <Suspense fallback={<div className={style.preloader}><img src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/08/s_2A9C470D38F43091CCD122E63014ED4503CAA7508FAF0C6806AE473C2B94B83E_1627522653545_loadinfo.gif?resize=200%2C200&ssl=1" alt=""/></div>}>
                    <Routes>
                        <Route path="/" element={<CardContainer />} />
                    </Routes>
                </Suspense>
            </div>
            <SidebarContainer />
            <FiltredCardContainer/>
        </div>
    );
}

export default App;
