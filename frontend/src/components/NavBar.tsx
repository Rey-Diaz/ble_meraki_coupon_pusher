import { FC } from 'react';
import '../styles/CustomStyles.css';
import React from 'react';

const NavBar: FC = () => {
    const hiddenLinks = false;

    return (
        <nav className="header" id="styleguideheader" role="navigation">
            <div className="header-panels">
                <div className="header-panel">
                    <a className="header__logo" href="https://gve-devnet.cisco.com/" target="_blank" rel="noreferrer noopener">
                        <img src="images/Cisco_Logo_no_TM_Sky_Blue-RGB.png" alt="Cisco Logo" />
                    </a>
                    <h1 className="header__title">{/*CUSTOM APP*/}</h1>
                </div>
                <div className="header-panel header-panel--right">
                    <a className={`header-item ${hiddenLinks ? 'hidden-5xl-down' : ''}`} href="/"><span className="icon-home"></span> Home</a>
                    <a className={`header-item ${hiddenLinks ? 'hidden-5xl-down' : ''}`} href="/">Logout</a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
