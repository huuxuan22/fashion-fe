import React, { useEffect, useState } from 'react';
import { Box, Typography, Fade, Grow } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SuccessNotification = ({ open, onClose, message }) => {
  const [show, setShow] = useState(open);

  useEffect(() => {
    if (open) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Fade in={show} timeout={300}>
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#333',
          padding: '40px 50px',
          borderRadius: '12px',
          boxShadow: 6,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '320px',
        }}
      >
        <Grow in={show} timeout={500}>
          <CheckCircleIcon sx={{ color: '#00C28C', fontSize: 60, mb: 2 }} />
        </Grow>
        <Typography
          variant="body1"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            textAlign: 'center',
          }}
        >
          {message || 'Sản phẩm đã được thêm vào Giỏ hàng'}
        </Typography>
      </Box>
    </Fade>
  );
};

export default SuccessNotification;
