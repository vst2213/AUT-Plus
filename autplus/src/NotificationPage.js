import React, { useState } from 'react';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Class starts at 10:00 AM', isRead: false },
    { id: 2, text: 'Assignment deadline is tomorrow', isRead: false },
    { id: 3, text: 'New announcement from your course instructor', isRead: false },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            {notification.text}
            {!notification.isRead && (
              <button onClick={() => handleMarkAsRead(notification.id)}>Mark as Read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;