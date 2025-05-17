import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { styled, keyframes } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles'; // Thêm dòng này

// Animation effects
const slideDown = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 72, 66, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(255, 72, 66, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 72, 66, 0); }
`;

// Sửa lại StyledAlert để không phụ thuộc vào theme trong styled
const StyledAlert = styled(MuiAlert)({
  width: '100%',
  minWidth: '300px',
  maxWidth: '450px',
  borderRadius: '12px',
  boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
  padding: '16px',
  backgroundColor: '#d32f2f',
  color: '#ffffff',
  animation: `${slideDown} 0.5s ease forwards`,
  '&:hover': {
    boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
  },
  '& .MuiAlert-icon': {
    padding: 0,
    marginRight: '12px',
    fontSize: '28px',
  },
  '& .MuiAlert-message': {
    padding: 0,
    width: '100%',
  },
  '& .MuiAlert-action': {
    paddingLeft: '8px',
    marginRight: '-4px',
    marginTop: '-4px',
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <StyledAlert 
      ref={ref} 
      variant="filled"
      icon={<ErrorIcon sx={{ fontSize: '28px' }} />}
      {...props}
    />
  );
});

function ErrorNotification({ 
  open, 
  title, 
  message, 
  onClose, 
  autoHideDuration = 6000, 
  action 
}) {
  const theme = useTheme(); // Sử dụng theme hook nếu cần

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      TransitionComponent={(props) => <Slide {...props} direction="down" />}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        '&.MuiSnackbar-root': {
          top: '32px !important',
        }
      }}
    >
      <Alert 
        severity="error"
        action={
          <>
            {action}
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)'
                }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        {title && (
          <Typography variant="subtitle2" fontWeight="600" gutterBottom>
            {title}
          </Typography>
        )}
        <Typography variant="body2" component="div">
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
}

export default ErrorNotification;