// Toast.js
import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const Toast = ({ open, message, severity = 'success', onClose }) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // 👈 Góc phải trên
      autoHideDuration={3000}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: 200,
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: severity === 'success' ? '#43a047' : undefined, // xanh lá đậm
          color: '#fff',
          fontWeight: 600,
          fontSize: '1.1rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
          borderRadius: 3, // bo tròn nhẹ
          padding: 2,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
