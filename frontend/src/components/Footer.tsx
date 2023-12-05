import { FC } from 'react';
import '../styles/CustomStyles.css';
import React from 'react';

interface FooterProps {
  timeAndLocation: string | null;
}

const Footer: FC<FooterProps> = ({ timeAndLocation }) => {
    return (
        <footer className="footer">
            <div className="footer__logo">
                <a href="https://gve-devnet.cisco.com/">
                    <img id="footer-link-gve-devnet" src="images/logo_long_blue.png" alt="GVE DevNet" />
                </a>
            </div>
            <div className="footer__links">
                {/* Other links */}
                <div id="time_location_note">
                    {timeAndLocation}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
