import style from './sidebar.module.css'
import FilterForm from "./filterForm/filterForm.tsx";

const SideBar = () => {
    return (
        <>
            <div className={style.sideBar}>
                <div>
                    <h2>
                        Filters:
                        <FilterForm/>
                    </h2>
                </div>
            </div>
        </>
    )
}

export default SideBar