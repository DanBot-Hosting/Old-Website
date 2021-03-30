import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../styles/nav.css";
import Button from "./nav-button";
import Button_Mobile from "./nav-button-mobile";

const bodyScrollLock = require("body-scroll-lock");
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const targetElement = document.querySelector("#mobile");

    if (click) {
        disableBodyScroll(targetElement);
    } else {
        enableBodyScroll(targetElement);
    }

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    DanBot &nbsp;
                    <i class="fas fa-server"></i>
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? "fas fa-times" : "fas fa-bars"}/>
                </div>
                <ul id="mobile" className={click ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/stats" className="nav-links" onClick={closeMobileMenu}>
                            Stats
                        </Link>
                    </li>

                    {/*<li className="nav-item">
                        <Link to="/plans" className="nav-links" onClick={closeMobileMenu}>
                            Plans
                        </Link>
                    </li>*/}

                    <li className="nav-item">
                        <a href="https://panel.danbot.host" target="_blank" className="nav-links" onClick={closeMobileMenu}>
                            Panel
                        </a>
                    </li>
                    <li>
                        <Button_Mobile componet={closeMobileMenu}/>
                    </li>
                </ul>
                <Button/>
            </nav>
        </>
    );
}

export default Navbar;