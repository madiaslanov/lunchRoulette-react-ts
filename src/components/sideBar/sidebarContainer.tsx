import SideBar from "./ui/sidebar.tsx";
import style from './sideBarContainer.module.css'
const sidebarContainer = () => {


    return (
        <div className={style.sidebarHolder} >
           <SideBar />
        </div>
    )
}

export default sidebarContainer