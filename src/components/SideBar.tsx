import { useActions } from "../hooks/useActions";
import { NavBar } from "../components/NavBar";
import { CSSTransition } from "react-transition-group";
import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const SideBar = () => {
    const { setNavBarOpened } = useActions();
    const navBarStatus = useTypedSelector(state => state.modalState.navBarIsOpened);

    const navbarHandler = (e:any) => {
        
        if(e.target.classList.contains("navbar-wrapper")) {
            setNavBarOpened(false);
        }
        
    }

    return (
        <div className="side-bar-wrapper" onClick={(e) => navbarHandler(e)}>
            <div className="side-bar">
                <button className="menu-btn" onClick={() => {setNavBarOpened(true)}}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className="side-bar-modals">
                    <CSSTransition
                        in={navBarStatus}
                        timeout={300}
                        classNames="navmodal"
                        unmountOnExit
                    >
                        <NavBar/>
                    </CSSTransition>
                </div>
            </div>
        </div>
    )
}
