import PropTypes from 'prop-types';



const UserNotification = ({ message, onClose }) => {
    return (
        <div>
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};


UserNotification.propTypes = {
    message: PropTypes.string.isRequired, // Ensure message is a required string
    onClose: PropTypes.func.isRequired,   // Ensure onClose is a required function
  };

export default UserNotification;
