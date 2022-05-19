import { useActions } from "../hooks/useActions";

export const SideBar = () => {
    
    const {setNavBarOpened} = useActions()
    
    return (
        <div className="side-bar">
            <button className="menu-btn" onClick={() => {setNavBarOpened(true)}}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    )
}
