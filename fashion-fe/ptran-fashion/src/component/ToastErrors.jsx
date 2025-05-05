import React from 'react';
import { 
  Snackbar, 
  Alert, 
  AlertTitle,
  IconButton 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const ErrorToast = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        '& .MuiSnackbar-root': {
          top: '24px !important'
        }
      }}
    >
      <Alert
        severity="error"
        variant="filled"
        onClose={onClose}
        icon={<ErrorOutlineIcon fontSize="inherit" />}
        sx={{
          width: '100%',
          backgroundColor: '#d32f2f',
          color: 'white',
          boxShadow: '0px 3px 5px rgba(0,0,0,0.2)',
          alignItems: 'center'
        }}
      >
        <AlertTitle sx={{ 
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          mb: 0.5
        }}>
          Lỗi
        </AlertTitle>
        {message}
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Alert>
    </Snackbar>
  );
};

