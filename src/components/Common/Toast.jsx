import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';
import './Toast.css';

const Toast = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheck />;
      case 'error':
        return <FiX />;
      case 'warning':
        return <FiAlertCircle />;
      case 'info':
        return <FiInfo />;
      default:
        return null;
    }
  };

  return (
    <div className="toast-container">
      {notifications.map((notification) => (
        <div key={notification.id} className={`toast toast-${notification.type}`}>
          <div className="toast-icon">
            {getIcon(notification.type)}
          </div>
          <div className="toast-message">
            {notification.message}
          </div>
          <button
            className="toast-close"
            onClick={() => removeNotification(notification.id)}
          >
            <FiX />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
