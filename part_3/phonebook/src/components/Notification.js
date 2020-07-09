import React from 'react';

const Notification = ({message, color}) => {
  const notificationStyle = {
    color: color,
  };

  if (message === null) {
    return null;
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
