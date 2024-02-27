import { useEffect, useState } from "react";
import { useUser } from "../Hooks/UserProvider";
import getUnreadMessages from "../utils/getUnreadMessages";
import markNotificationAsRead from "../utils/markAsRead";

export default function Notifications({ updateNumberofNotifications }) {
  const user = useUser();
  const [notifications, setNotifications] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    notifications?.length
      ? updateNumberofNotifications(notifications.length)
      : updateNumberofNotifications(null);
  }, [notifications]);

  useEffect(() => {
    if (user) {
      let unsubscribe;
      try {
        unsubscribe = getUnreadMessages(user.uid, setNotifications);
      } catch (err) {
        setError(err);
      }

      return () => {
        if (typeof unsubscribe === "function") {
          unsubscribe();
        }
      };
    }
  }, [user]);
  const handleMarkAsReadNotification = async (notificationId) => {
    try {
      await markNotificationAsRead(user.uid, notificationId);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="narrow-scroller notificaions-box absolute w-[300px] h-[300px] z-40 overflow-y-auto bg-black text-white py-2 rounded  top-[110%] -right-[calc(280px/2)] px-2 scale-0 transition-all duration-300 origin-top">
      <h1 className=" sticky top-0 bg-black text-center font-semibold text-lg">
        Notifications
      </h1>
      {error && <small className="text-center">{error.message}</small>}
      <div className=" space-y-1">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="group/notify relative rounded  border bg-slate-900"
            >
              <p className=" text-sm p-2">{notification.message}</p>
              <button
                onClick={() => handleMarkAsReadNotification(notification.id)}
                className=" absolute hidden group-hover/notify:block text-xs bottom-0 right-1 hover:text-green-600"
              >
                Mark as read
              </button>
            </div>
          ))
        ) : (
          <p className=" text-center text-xs">Inbox is empty</p>
        )}
      </div>
    </div>
  );
}
