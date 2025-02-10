import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton = () => {

  const handleClick = () => {
  };

  return (
    <button
      onClick={handleClick}
      style={styles.button}
    >
      <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
    </button>
  );
};

const styles = {
  button: {
    position: 'fixed',
    top: '10px',
    left: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1000
  },
  icon: {
    color: 'black', // Đặt màu icon là đen
    fontSize: '24px',
  },
};

export default BackButton;
