import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function CustomToast({ message, duration = 3000, onClose, show }) {
  const handleClose = () => {
    if (onClose) onClose(); // Gọi callback để cập nhật trạng thái từ parent
  };

  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
      <Toast show={show} onClose={handleClose} bg="success" autohide>
        <Toast.Header>
          <strong className="me-auto">Thông báo</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default CustomToast;
