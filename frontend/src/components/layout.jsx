
import PropTypes from 'prop-types';
import NavBar from './core/NavBar';
import Footer from './core/Footer';

const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};

export default Layout;
