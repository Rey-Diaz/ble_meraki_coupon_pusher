
import PropTypes from 'prop-types'; // Import PropTypes
import '../../styles/CustomStyles.css';

const Footer = ({ timeAndLocation }) => {
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

// Define propTypes for the timeAndLocation prop
Footer.propTypes = {
    timeAndLocation: PropTypes.string,
};

export default Footer;
