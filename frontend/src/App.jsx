import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

// Define propTypes
const propTypes = {
  children: PropTypes.node, // Validate the 'children' prop
};

const App = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [location, setLocation] = useState('Fetching location...');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        );
        const data = await response.json();
        setLocation(data.display_name);
      }, () => {
        setLocation(null);
      });
    } else {
      setLocation(null);
    }
  }, []);

  const timeAndLocation = location ? `${currentTime} - ${location}` : currentTime;

  return (
    <div className="App">
      <div className="main-content">
        {/* Place the GIF here */}
        <img src="images/to_be_continued.gif" alt="Description of GIF" />
      </div>
      <NavBar />
      <div className="content content--alt">
        <div className="container-fluid">{children}</div>
      </div>
      <Footer timeAndLocation={timeAndLocation} />
    </div>
  );
};

// Apply propTypes to the component
App.propTypes = propTypes;

export default App;
