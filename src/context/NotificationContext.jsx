import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback(
    (type, message, duration = 3000) => {
      const id = Date.now();
      const notification = { id, type, message };

      setNotifications((prev) => [...prev, notification]);

      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    [removeNotification]
  );

  const success = useCallback(
    (message, duration = 3000) => {
      return addNotification("success", message, duration);
    },
    [addNotification]
  );

  const error = useCallback(
    (message, duration = 5000) => {
      return addNotification("error", message, duration);
    },
    [addNotification]
  );

  const warning = useCallback(
    (message, duration = 4000) => {
      return addNotification("warning", message, duration);
    },
    [addNotification]
  );

  const info = useCallback(
    (message, duration = 3000) => {
      return addNotification("info", message, duration);
    },
    [addNotification]
  );

  // showNotification(message, type) — convenience alias used by all hooks/pages
  const showNotification = useCallback(
    (message, type = 'info', duration = 3000) => {
      return addNotification(type, message, duration);
    },
    [addNotification]
  );

  const value = {
    notifications,
    addNotification,
    removeNotification,
    showNotification,
    success,
    error,
    warning,
    info,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }

  return context;
};